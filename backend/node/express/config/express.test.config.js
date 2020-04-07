import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config = {
	port: env.EXPRESS_TEST_PORT,
	publicPath: env.EXPRESS_TEST_PUBLIC_PATH,
	tokenArgs: {
		secret: "process.env.AUTH_TOKEN_SECRET",
		issuer: "process.env.AUTH_TOKEN_ISSUER",
		audience: "process.env.AUTH_TOKEN_AUDIENCE",
	},
	routePage: {
		main: "process.env.DEV_MAIN_PAGE",
		host: "process.env.DEV_HOST_PAGE",
		guest: "process.env.DEV_GUEST_PAGE",
	},
	// todo better way
	oAuthArgs: {
		clientID: "process.env.OAUTH2_CLIENT_DEV_ID",
		clientSecret: "process.env.OAUTH2_CLIENT_DEV_SECRET",
		callbackURL: "http://localhost:3001/auth/google/callback",
	},
};

export default config;
