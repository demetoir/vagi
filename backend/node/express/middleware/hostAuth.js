import jwt from "jsonwebtoken";
import CookieKeys from "../CookieKeys.js";
import {isExistHostOAuthId} from "../../DB/queries/host.js";
import logger from "../logger.js";
import config from "../config";

const {tokenArgs, routePage} = config;

const cookieKey = CookieKeys.HOST_APP;

/**
 *
 * @param req {object}
 * @return {*|ResponseCookie}
 */
function parseHostJWt(req) {
	if (!(cookieKey in req.cookies)) {
		throw Error(`cookie key '${cookieKey}' not found in request cookies`);
	}

	return req.cookies[cookieKey];
}

/**
 *
 * @param hostOauthId {string}
 * @return {Promise<void>}
 */
async function verifyHost(hostOauthId) {
	const isExist = await isExistHostOAuthId(hostOauthId);

	if (!isExist) {
		throw Error(`host's OauthId ${hostOauthId} is not verified`);
	}
}

/**
 *
 * @param req {object}
 * @param res {object}
 * @param next {function}
 * @return {Promise<*>}
 */
export default async function hostAuthenticate(req, res, next) {
	try {
		const hostJwt = parseHostJWt(req);
		const payload = jwt.verify(
			hostJwt,
			tokenArgs.secret,
		);

		const hostOauthId = payload.sub;

		await verifyHost(hostOauthId);

		return res.redirect(routePage.host);
	} catch (e) {
		logger.error(e, e.stack);
		return next();
	}
}
