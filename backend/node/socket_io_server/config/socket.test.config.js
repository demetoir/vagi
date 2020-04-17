import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const NAME_SPACE = "socket/namespace/event";
const config = {
	port: env.SOCKET_IO_SERVER_TEST_PORT,
	namespace: NAME_SPACE,
};

export default config;
