import jwt from "jsonwebtoken";
import loadConfig from "../config/configLoader";
import logger from "../logger";
import {isExistHostOAuthId} from "../../DB/queries/host";
import {isExistGuest} from "../../DB/queries/guest";
import {AUTHORITY_TYPE_GUEST, AUTHORITY_TYPE_HOST,} from "../../constants/authorityTypes.js";

const {tokenArgs} = loadConfig();

const subjectVerifierMapperByAud = {guest: isExistGuest, host: isExistHostOAuthId};

const isInValidAud = aud =>
	aud !== AUTHORITY_TYPE_GUEST && aud !== AUTHORITY_TYPE_HOST;

const isInValidIss = iss => iss !== tokenArgs.issuer;

async function verifyPayload(payload) {
	const {aud, iss, sub} = payload;

	if (isInValidIss(iss)) {
		throw new Error("Authentication Error: invalid iss");
	}

	if (isInValidAud(aud)) {
		throw new Error("Authentication Error: invalid aud");
	}

	const verifySubject = subjectVerifierMapperByAud[aud];
	const isValidSub = await verifySubject(sub);

	if (!isValidSub) {
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
