/**
 *
 * @param cookieKey {string}
 * @param logger
 * @return {function}
 */
export default function(cookieKey, logger = console) {
	/**
	 *
	 * @param req {express.Request}
	 * @param res {express.Response}
	 * @param next {express.NextFunction}
	 * @return {Promise<*|ResponseCookie>}
	 */
	return function JWTCookieParser(req, res, next) {
		if (!("cookies" in req)) {
			logger.debug(`cookies is not Found in request`);
			return next();
		}

		if (!(cookieKey in req.cookies)) {
			logger.debug(`jwtCookies not Found in request by cookie key ${cookieKey}`);
			return next();
		}

		if (!("jwtCookies" in req)) {
			req.jwtCookies = {};
		}

		req.jwtCookies[cookieKey] = req.cookies[cookieKey];
		logger.debug(`parse JWT cookie of cookie key ${cookieKey}`);

		return next();
	};
}

