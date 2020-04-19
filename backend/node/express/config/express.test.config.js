import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config = {
	hostDomain: env.TEST_HOST_DOMAIN,
	port: env.EXPRESS_TEST_PORT,
	publicPath: env.EXPRESS_TEST_PUBLIC_PATH,
	tokenArgs: {
		secret: "auth_token_secret",
		issuer: "auth_token_issuer",
		audience: "auth_token_audience",
	},
	oAuthArgs: {
		clientID: "oauth2_client_dev_id",
		clientSecret: "oauth2_client_dev_secret",
		callbackURL: `http://${env.TEST_HOST_DOMAIN}${process.env.TEST_OAUTH2_CALLBACK}`,
	},
	routePage: {
		main: "http://test/main",
		host: "http://test/host",
		guest: "http://test/guest",
	},
};

export default config;
