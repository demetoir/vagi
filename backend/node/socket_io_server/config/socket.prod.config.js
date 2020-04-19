import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const NAME_SPACE = "socket/namespace/event";
const config = {
	port: env.SOCKET_IO_SERVER_PROD_PORT,
	namespace: NAME_SPACE,
	tokenArgs: {
		secret: process.env.AUTH_TOKEN_SECRET,
		issuer: process.env.AUTH_TOKEN_ISSUER,
		audience: process.env.AUTH_TOKEN_AUDIENCE,
	},
};

export default config;
