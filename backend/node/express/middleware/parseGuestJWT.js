import ParseGuestJWTError from "./ParserGuestJWTError.js";
import CookieKeys from "../CookieKeys.js";

const cookieKey = CookieKeys.GUEST_APP;

/**
 *
 * @param req {object}
 */
export default function parseGuestJWt(req) {
	if (!(cookieKey in req.cookies)) {
		throw new ParseGuestJWTError(`cookie key '${cookieKey}' not found in request cookies`);
	}

	return req.cookies[cookieKey];
}
