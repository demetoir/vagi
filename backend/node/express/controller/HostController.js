import CookieKeys from "../CookieKeys.js";
import config from "../config";

const {routePage} = config;


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
		res.clearCookie(CookieKeys.HOST_APP).redirect(routePage.main);
	}

	/**
	 *
	 * @param req {express.Request}
	 * @param res {express.Response}
	 */
	redirectToHostApp(req, res) {
		res.redirect(routePage.host);
	}
}
