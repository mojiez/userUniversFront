import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser, currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { ReactNode } from 'react';
import { RequestConfig } from 'umi';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

// 设置一个白名单
const NO_NEED_LOGIN_WHITE_LIST = ['/user/register', loginPath];
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

// getInitialState会返回一个对象
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  // 这个属性是一个函数，他不接受任何参数并且返回一个Promise对象 这个Promise可以解析为CurrentUser或者undefined
}> {
  // 首先定义fetchUserInfo 这是一个异步函数 返回值为Promise 要么是CurrentUser 要么是undefined
  const fetchUserInfo = async () => {
    try {
      // 这里执行查找当前用户的操作
      // 在fetchUserInfo里面再查一遍？
      const msg = await queryCurrentUser();
      console.log(msg.data.currentUser);
      return msg.data.currentUser;
    } catch (error) {
      // 如果没找到 报错了
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  // 如果当前页面不是登陆页面（已经登陆过的页面 要返回用户信息）

  // 如果是无需登陆的页面 直接不执行fetchUserInfo:
  if (NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname)) {
    return {
      fetchUserInfo,
      settings: defaultSettings,
    };
  }

  // 如果是需要登陆的页面 则执行fetchUserInfo 会进行页面跳转
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
  };
  // if (history.location.pathname !== loginPath) {
  //   //
  //   const currentUser = await fetchUserInfo();
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: defaultSettings,
  //   };
  // }
  // 当前页面是登陆页面（不返回用户信息）
  // return {
  //   fetchUserInfo,
  //   settings: defaultSettings,
  // };
}

// 配置request
export const request: RequestConfig = {
  prefix: '/api',
  timeout: 10000,
};
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 钩子函数 每次页面改变都会调用
      const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
      // 如果是需要登陆的页面 重定向到 login
      if (!initialState?.currentUser && !NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)) {
        // currentUser为空 当前路径也不是不需要登陆就能查看的路径
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: ReactNode, props: { location: Location }) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
