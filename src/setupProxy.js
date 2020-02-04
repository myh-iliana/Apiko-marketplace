const createProxy = require('http-proxy-middleware');

const proxy = createProxy({
  target: 'https://apiko-intensive-backend.herokuapp.com/',
  pathRewrite: {
    '^/api': '',
  },
  changeOrigin: true,
});

const wsProxy = createProxy({
  target: 'https://apiko-intensive-backend.herokuapp.com/',
  // pathRewrite: {
  //   '^/api': '',
  // },
  changeOrigin: true,
  ws: true,
});

module.exports = (app) => {
  app.use('/api', proxy);
  app.use('/socket.io', wsProxy);
};
