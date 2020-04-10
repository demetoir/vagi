import {createGuest} from "../../DB/queries/guest.js";
import CookieKeys from "../CookieKeys.js";
import config from "../config";
import JWTCookieOptions from "../JWTCookie/JWTCookieOptions.js";
import validateEventCode from "../validator/validateEventCode.js";
import guestJWTCookie from "../JWTCookie/guestJWTCookie.js";

const {routePage} = config;

function decodeEventCode(path) {
	return Buffer.from(path, "base64").toString();
}

// todo test
export default class GuestController {
	/**
	 *
	 * @param logger {object}
	 */
	constructor(logger) {
		this.logger = logger;
	}

	logIn() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 * @return {Promise<void>}
		 */
		return async (req, res) => {
			res.redirect(routePage.guest);

			this.logger.info("guest login");
		};
	}

	logOut() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 * @return {Promise<void>}
		 */
		return (req, res) => {
			res.clearCookie(CookieKeys.GUEST_APP).redirect(routePage.main);

			this.logger.info("guest logout");
		};
	}

	signUp() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 * @return {Promise<void>}
		 */
		return async (req, res) => {
			const path = req.params.encodedEventCode;
			const eventCode = decodeEventCode(path);
			const [isValid, event] = await validateEventCode(eventCode);

			if (!isValid) {
				this.logger.info("sign up fail");
				return res.redirect(routePage.main);
			}

			// todo need try catch
			const eventId = event.id;
			const guest = await createGuest(eventId);

			const payload = {guestSid: guest.guestSid};
			const accessToken = guestJWTCookie.sign(payload);
			const cookieOption = JWTCookieOptions.build();

			res.cookie(CookieKeys.GUEST_APP, accessToken, cookieOption);

			this.logger.info("sign up success");
			return res.redirect(routePage.guest);
		};
	}
}
