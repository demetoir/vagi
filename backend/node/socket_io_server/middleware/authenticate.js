import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader";
import logger from "../logger";
import {findHostByOAuthId} from "../../DB/queries/host.js";
import {getGuestByGuestSid} from "../../DB/queries/guest";
import {
	AUTHORITY_TYPE_GUEST,
	AUTHORITY_TYPE_HOST,
} from "../../constants/authorityTypes.js";

const {tokenArgs} = loadConfig();

const isInValidAud = aud =>
	aud !== AUTHORITY_TYPE_GUEST && aud !== AUTHORITY_TYPE_HOST;

const isInValidIss = iss => iss !== tokenArgs.issuer;

// todo refactoring
async function verifyPayload(payload) {
	const {aud, iss} = payload;

	if (isInValidIss(iss)) {
		throw new Error("Authentication Error: invalid iss");
	}

	if (isInValidAud(aud)) {
		throw new Error("Authentication Error: invalid aud");
	}

	let user = null;

	if (aud === "guest") {
		user = getGuestByGuestSid(payload.guestSid);
	} else if (aud === "host") {
		user = findHostByOAuthId(payload.oauthId);
	}

	if (!user) {
		throw new Error("Authentication Error: invalid userInfo");
	}
}

async function authenticate(socket, next) {
	try {
		const token = socket.handshake.query.token;
		const payload = jwt.verify(token, tokenArgs.secret);

		await verifyPayload(payload);

		return next();
	} catch (e) {
		logger.debug(e);
		return next(new Error("Authentication Error"));
	}
}

export default authenticate;
