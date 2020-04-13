import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader";
import logger from "../logger";
import verifyJWTPayload from "../validator/verifyJWTPayload.js";

const {tokenArgs} = loadConfig();

async function authenticate(socket, next) {
	try {
		const token = socket.handshake.query.token;
		const payload = jwt.verify(token, tokenArgs.secret);

		await verifyJWTPayload(payload);

		return next();
	} catch (e) {
		logger.debug(e);
		return next(new Error("Authentication Error"));
	}
}

export default authenticate;
