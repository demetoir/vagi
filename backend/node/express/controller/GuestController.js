import btoa from "btoa";
import {createGuest} from "../../DB/queries/guest.js";
import CookieKeys from "../CookieKeys.js";
import config from "../config";
import JWTCookieOptions from "../JWTCookie/JWTCookieOptions.js";
import validateEventCode from "../validator/validateEventCode.js";
import guestJWTCookie from "../JWTCookie/guestJWTCookie.js";

const {routePage} = config;

// todo test and refactoring
function decodeEventCode(encodedEventCode) {
	const result = Buffer.from(encodedEventCode, "base64").toString();
	const reverse = btoa(result);

	if (reverse !== encodedEventCode) {
		throw new Error("can not decode eventCode");
	}

	return result;
}

export default class GuestController {
	/**
	 *
	 * @param logger {object}
	 */
	constructor(logger = console) {
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
			res.clearCookie(CookieKeys.GUEST_APP);
			res.redirect(routePage.main);

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
			const encodedEventCode = req.params.encodedEventCode || null;

			if (encodedEventCode === null) {
				throw new Error("encodedEventCode not found in request.params");
			}

			const eventCode = decodeEventCode(encodedEventCode);
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
