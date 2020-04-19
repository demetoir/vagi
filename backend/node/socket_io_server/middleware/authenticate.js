import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader";
import logger from "../logger";
import verifyJWTPayload from "../validator/verifyJWTPayload.js";
import BearerTokenParser from "../../libs/BearerTokenParser.js";

const {tokenArgs} = loadConfig();

async function authenticate(socket, next) {
	const token = BearerTokenParser.parse(socket.handshake);

	if (token === null) {
		const errorMsg = `authenticate error: jwt is not found in bearer token`;

		logger.error(errorMsg);

		return next(new Error(errorMsg));
	}

	let payload;

	try {
		payload = jwt.verify(token, tokenArgs.secret);
	} catch (e) {
		logger.debug(e);
		return next(new Error("authenticate error: jwt malformed"));
	}

	try {
		await verifyJWTPayload(payload);
	} catch (e) {
		logger.debug(e);
		return next(e);
	}

	return next();
}

export default authenticate;
