const { createProxyMiddleware } = require("http-proxy-middleware");

/* 
Hacky workaround so that storybook can proxy to the local API server.
This won't work on build versions of storybook, but it's fine for local development. It's only 
intended so we can have stories to test the API calls.

Source: https://github.com/storybookjs/storybook/issues/208
*/

module.exports = function expressMiddleware(router) {
  router.use(
    "/api/sparql",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );
};
