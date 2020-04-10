import CookieKeys from "../CookieKeys.js";
import config from "../config";

const {routePage} = config;

// todo test
export default class HostController {
	constructor(logger) {
		this.logger = logger;
	}

	/**
	 *
	 * @param req {express.Request}
	 * @param res {express.Response}
	 */
	logout(req, res) {
		// this.logger.debug("host logout");
		res.clearCookie(CookieKeys.HOST_APP).redirect(routePage.main);
	}

	/**
	 *
	 * @param req {express.Request}
	 * @param res {express.Response}
	 */
	redirectToHostApp(req, res) {
		// this.logger.debug("redirect to host");
		res.redirect(routePage.host);
	}
}
