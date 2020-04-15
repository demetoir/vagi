import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config = {
	hostDomain: env.DEV_HOST_DOMAIN,
	port: env.EXPRESS_DEV_PORT,
	publicPath: env.EXPRESS_DEV_PUBLIC_PATH,
	tokenArgs: {
		secret: process.env.AUTH_TOKEN_SECRET,
		issuer: process.env.AUTH_TOKEN_ISSUER,
		audience: process.env.AUTH_TOKEN_AUDIENCE,
	},
	oAuthArgs: {
		clientID: process.env.OAUTH2_CLIENT_DEV_ID,
		clientSecret: process.env.OAUTH2_CLIENT_DEV_SECRET,
		callbackURL: `http://${env.DEV_HOST_DOMAIN}${process.env.OAUTH2_DEV_CALLBACK}`,
	},
	routePage: {
		main: process.env.DEV_MAIN_PAGE,
		host: process.env.DEV_HOST_PAGE,
		guest: process.env.DEV_GUEST_PAGE,
	},
};

export default config;
