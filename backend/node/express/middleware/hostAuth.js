import jwt from "jsonwebtoken";
import logger from "../logger.js";
import config from "../config";
import parseHostJWt from "./parseHostJWt.js";
import verifyHostByOauthId from "./verifyHostByOauthId.js";

const {tokenArgs, routePage} = config;


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

		verifyHostByOauthId(hostOauthId);

		return res.redirect(routePage.host);
	} catch (e) {
		logger.error(e, e.stack);
		return next();
	}
}
