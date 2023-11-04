// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    // 查询数据库返回的东西

    // name?: string;
    // avatar?: string;
    // userid?: string;
    // email?: string;
    // signature?: string;
    // title?: string;
    // group?: string;
    // tags?: { key?: string; label?: string }[];
    // notifyCount?: number;
    // unreadCount?: number;
    // country?: string;
    // access?: string;
    // geographic?: {
    //   province?: { label?: string; key?: string };
    //   city?: { label?: string; key?: string };
    // };
    // address?: string;
    // phone?: string;

    id?: number;
    userName?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    email?: string;
    userState?: number;
    phone?: string;
    role?: number;
    createTime?: Date;
  };

  type R = {
    success?: boolean;
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type LoginResult = {
    // status?: string;
    type?: string;
    // currentAuthority?: string;
    success?: boolean;
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type LogoutResult = {
    success?: boolean;
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type RegisterResult = {
    trpe?: string;
    success?: boolean;
    code?: number;
    message?: string;
    data: {
      id: number;
    };
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    account?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    account?: string;
    password?: string;
    checkPassword?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type UserList = {
    success?: boolean;
    code?: number;
    message?: string;
    data?: {
      users: [];
    };
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
