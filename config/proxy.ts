/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

// ant design pro提供了一个配置代理的方法 来解决跨域问题
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**

    // 代理的逻辑
    // 我的前端服务运行在localhost:8000上面，如果我请求localhost:8000/api的话 会进行代理
    // 代理将请求转发到后端的服务
    // 请求http://localhost:8000/api/user/login
    // 实际上是请求 http://localhost:8080/api/user/login
    // 我怎么知道他走没走代理服务器
    '/api/': {
      // 要代理的地址
      target: 'http://localhost:8080',
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      logLevel: 'debug',
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
