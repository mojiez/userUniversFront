/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
/**
 * umi框架中 access.ts控制用户的访问权限
 */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.role === 1,
  };
}
