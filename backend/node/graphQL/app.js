import cors from "cors";
import {GraphQLServer} from "graphql-yoga";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import resolvers from "./model/resolvers.js";
import typeDefs from "./model/typeDefs.js";
import config from "./config/config.js";
import logger from "./logger.js";
import authenticate from "./middlewares/authenticate.js";

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	middlewares: [authenticate],
	context: context => context,
});

server.express.use(cors());
server.express.use(morgan("dev"));
server.express.use(cookieParser());

server.start(config, ({port}) => {
	logger.info(`graphQL yoga Server is running on localhost:${port}`);
});
