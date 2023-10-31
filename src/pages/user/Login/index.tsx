import Footer from '@/components/Footer';
import { currentUser, login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';
import { SYSTEM_LOGO, USER_ADMIN_LINK } from '@/ constants/index';
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    // 异步函数
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log('zhelishi USERINFO' + userInfo);
    // 这行代码尝试从initial对象中获取fetchUserInfo方法
    // 通过？来实现就算initialstate或者fetchUserInfo是null或者undefined也不会报错
    if (userInfo) {
      console.log(userInfo);
      // 如果取到了userinfo 就通过setInitialState修改InitialState的值
      await setInitialState((s) => ({
        // s是当前InitialState的状态
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({
        ...values,
        type,
      });
      if (msg.success === true) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // login 返回的是msg msg成功以后调用fetchUserInfo

        // fetchUserInfo 要干两件事：
        // 1. 查询用户信息 已经有了 message里面 第二件事是更新状态

        await fetchUserInfo();
        // console.log(msg.data);
        // if (msg.data) {
        //   await setInitialState((s) => ({
        //     ...s,
        //     currentUser: msg.data,
        //   }));
        // }
        // console.log(initialState?.currentUser);

        // 此时已经查询到了用户信息 并把用户状态也保存好了
        /** 此方法会跳转到 redirect 参数所在的位置 */
        // history 是用于管理应用程序路由的对象，如果不存在history对象，可能是没有初始化 那就直接返回

        if (!history) return;
        // location获取当前页面的位置信息
        const { query } = history.location;
        // 对query进行结构
        const { redirect } = query as {
          redirect: string;
        };
        // 实现路由跳转
        history.push(redirect || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const { success, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="dick" src={SYSTEM_LOGO} />}
          title="userAtdp"
          subTitle={'userAtdp用户前台界面'}
          initialValues={{
            autoLogin: true,
          }}
          // actions={[
          //   '其他登录方式 :',
          //   <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
          //   <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
          //   <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          // ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
          // 时间处理函数 在表单提交后执行 参数values是表单中的数据
          // await等待一个异步操作的完成
          // handleSubmit 异步函数的调用 将value作为参数传递
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码登录'} />
            {/* <Tabs.TabPane key="mobile" tab={'手机号登录'} /> */}
          </Tabs>

          {success === false && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {/* 如果说状态是error 并且 是通过用户名登录的 就显示一个LoginMessage组件 */}

          {type === 'account' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: '账户长度不能小于4',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8',
                  },
                ]}
              />
            </>
          )}

          {/*
          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={'请输入手机号！'}
                rules={[
                  {
                    required: true,
                    message: '手机号是必填项！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await getFakeCaptcha({
                    phone,
                  });
                  // if (result === false) {
                  //   return;
                  // }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}

              */}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
              href={USER_ADMIN_LINK}
              target="_blank"
              rel="noreferer"
              // target这个属性说明新建窗口打开
              // 表示不要发送 HTTP Referer 头。这通常用于隐私保护，以防止链接目标网站知道您是从哪个网页跳转过去的。
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
