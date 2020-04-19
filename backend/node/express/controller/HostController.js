import CookieKeys from "../CookieKeys.js";
import config from "../config";

const {routePage} = config;

export default class HostController {
	constructor(logger = console) {
		this.logger = logger;
	}

	logout() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 */
		return (req, res) => {
			this.logger.debug("host logout");
			res.clearCookie(CookieKeys.HOST_APP);
			res.redirect(routePage.main);
		};
	}

	redirectToHostApp() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 */
		return (req, res) => {
			this.logger.debug("redirect to host");
			res.redirect(routePage.host);
		};
	}
}
