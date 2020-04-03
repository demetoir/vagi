import CookieKeys from "../CookieKeys.js";
import ParseHostJWtError from "./ParseHostJWtError.js";

const cookieKey = CookieKeys.HOST_APP;


/**
 *
 * @param req {object}
 * @return {*|ResponseCookie}
 */
export default function parseHostJWt(req) {
	if (!(cookieKey in req.cookies)) {
		throw new ParseHostJWtError(`cookie key '${cookieKey}' not found in request cookies`);
	}

	return req.cookies[cookieKey];
}
