/**
 *
 * @param reqValidateFunc {function}
 * @param redirectPath {string}
 * @return {function}
 */
export default function RedirectOnFailValidate(reqValidateFunc, redirectPath) {
	/**
	 *
	 * @param req {express.Request}
	 * @param res {express.Response}
	 * @param next {express.NextFunction}
	 * @return {Promise<*>}
	 */
	return async function redirectOnFailValidate(req, res, next) {
		const [isValid, result] = await reqValidateFunc(req);

		console.debug(result);

		if (!isValid) {
			return res.redirect(redirectPath);
		}

		return next();
	};
}
