import {
	AUTHORITY_TYPE_GUEST,
	AUTHORITY_TYPE_HOST,
} from "../../constants/authorityTypes.js";
import {getGuestByGuestSid} from "../../DB/queries/guest.js";
import {findHostByOAuthId} from "../../DB/queries/host.js";
import loadConfig from "../config/configLoader.js";

const {tokenArgs} = loadConfig();

const isInValidAud = aud =>
	aud !== AUTHORITY_TYPE_GUEST && aud !== AUTHORITY_TYPE_HOST;

const isInValidIss = iss => iss !== tokenArgs.issuer;

// todo refactoring here
export default async function verifyJWTPayload(payload) {
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
