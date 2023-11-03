import Footer from '@/components/Footer';
import { currentUser, login, register } from '@/services/ant-design-pro/api';
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
import { values } from 'lodash';
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
const Register: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  // const { initialState, setInitialState } = useModel('@@initialState');

  const handleRegister = async (values: API.RegisterParams) => {
    try {
      // 注册
      const resp = await register({
        ...values,
        type,
      });
      // if (resp.success === true) {

      //   const defaultRegisterSuccessMessage = '注册成功! ';
      //   message.success(defaultRegisterSuccessMessage);

      //   // 跳转到用户登陆页面？

      // }
      if (resp?.data?.id > 0) {
        const defaultRegisterSuccessMessage = '注册成功! ';
        message.success(defaultRegisterSuccessMessage);
        // 注册成功后跳转到 redirect 参数所在的位置
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        // 如果之前就没有重定向的话，这里的redirect就是undefined
        // history.push('/user/login?redirect' + redirect);
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      } else {
        throw new Error('register error id = ${resp?.data?.id}');
      }
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试';
      message.error(defaultRegisterFailureMessage);
    }
  };

  const { success, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
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
            // await handleSubmit(values as API.LoginParams);
            await handleRegister(values as API.RegisterParams);
          }}
          // 时间处理函数 在表单提交后执行 参数values是表单中的数据
          // await等待一个异步操作的完成
          // handleSubmit 异步函数的调用 将value作为参数传递
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'我要狠狠的注册'} />
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
                placeholder={'请输入账户'}
                rules={[
                  {
                    required: true,
                    message: '账户是必填项！',
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
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'再次输入密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '再次输入！',
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
            {/* <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox> */}
            {/* <a
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
            </a> */}
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
