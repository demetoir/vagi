import btoa from "btoa";
import {createGuest} from "../../DB/queries/guest.js";
import CookieKeys from "../CookieKeys.js";
import config from "../config";
import JWTCookieOptions from "../JWTCookie/JWTCookieOptions.js";
import validateEventCode from "../validator/validateEventCode.js";

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
				this.logger.info(
					`encodedEventCode not found in request.params`,
				);

				// todo redirect to main error page
				return res.redirect(routePage.main);
			}

			let eventCode;

			try {
				eventCode = decodeEventCode(encodedEventCode);
			} catch (e) {
				const errorMsg = "can not decode eventCode";

				this.logger.info(errorMsg);

				return res.redirect(routePage.main);
			}

			const [isValid, event] = await validateEventCode(eventCode);

			if (!isValid) {
				this.logger.info(`invalid event code: ${eventCode}`);
				// todo redirect to main error page
				return res.redirect(routePage.main);
			}

			const eventId = event.id;

			// todo add test case
			let guest;

			try {
				guest = await createGuest(eventId);
			} catch (e) {
				this.logger.info(`can not create guest of eventId: ${eventId}`);

				return res.redirect(routePage.main);
			}

			const cookieOption = JWTCookieOptions.build();

			res.cookie("guestSid", guest.guestSid, cookieOption);

			this.logger.info("sign up success");
			return res.redirect(routePage.guest);
		};
	}
}
