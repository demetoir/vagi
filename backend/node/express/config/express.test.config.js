import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config = {
	port: env.EXPRESS_TEST_PORT,
	publicPath: env.EXPRESS_TEST_PUBLIC_PATH,
	tokenArgs: {
		secret: "auth_token_secret",
		issuer: "auth_token_issuer",
		audience: "auth_token_audience",
	},
	routePage: {
		main: "http://test/main",
		host: "http://test/host",
		guest: "http://test/guest",
	},
	oAuthArgs: {
		clientID: "oauth2_client_dev_id",
		clientSecret: "oauth2_client_dev_secret",
		callbackURL: "http://localhost:3001/auth/google/callback",
	},
};

export default config;
