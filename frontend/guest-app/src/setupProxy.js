const dotenv = require("dotenv");
const proxy = require("http-proxy-middleware");

dotenv.config();
const domain = process.env.REACT_APP_DEV_DOMAIN;
const options = {target: `http://${domain}`};

module.exports = function(app) {
	app.use(proxy.createProxyMiddleware("/api", options));
	// app.use(proxy.createProxyMiddleware("/guest", options));
	// app.use(proxy.createProxyMiddleware("/host", options));
	// app.use(proxy.createProxyMiddleware("/guest-app", options));
	// app.use(proxy.createProxyMiddleware("/host-app", options));
	// app.use(proxy.createProxyMiddleware("/auth", options));
};
