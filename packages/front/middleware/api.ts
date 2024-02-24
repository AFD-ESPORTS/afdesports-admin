import { createProxyMiddleware } from "http-proxy-middleware";

export default function (req, res, next) {
  const apiProxy = createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  });

  apiProxy(req, res, next);
}
