import jwt from "jsonwebtoken";
import CookieKeys from "../CookieKeys.js";
import {isExistHostOAuthId} from "../../DB/queries/host.js";
import logger from "../logger.js";
import config from "../config";

const {tokenArgs, routePage} = config;

export default async function hostAuthenticate(req, res, next) {
	try {
		const payload = jwt.verify(
			req.cookies[CookieKeys.HOST_APP],
			tokenArgs.secret,
		);
		const isExist = await isExistHostOAuthId(payload.sub);

		if (isExist) {
			res.redirect(routePage.host);
		}

		return next();
	} catch (e) {
		logger.error(e);
		return next();
	}
}
