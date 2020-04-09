import dotenv from "dotenv";

dotenv.config();

const options = {
	port: 8000,
	endpoint: "/graphql",
	subscriptions: "/subscriptions",
	playground: "/playground",
	tokenArgs: {
		secret: process.env.AUTH_TOKEN_SECRET,
		issuer: process.env.AUTH_TOKEN_ISSUER,
		audience: process.env.AUTH_TOKEN_AUDIENCE,
	},
};

export default options;
