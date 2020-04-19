export default class BearerTokenParser {
	/**
	 *
	 * @param req {express.Request}
	 */
	static parse(req) {
		if (
			req.headers &&
			req.headers.authorization &&
			req.headers.authorization.slice(0, 7) === "Bearer "
		) {
			return req.headers.authorization.slice(7);
		}

		return null;
	}
}
