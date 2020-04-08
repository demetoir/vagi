import {createGuest} from "../../DB/queries/guest.js";
import CookieKeys from "../CookieKeys.js";
import config from "../config";
import JWTCooKieOptions from "../JWTCookie/JWTCooKieOptions.js";
import validateEventCode from "../validator/validateEventCode.js";
import guestJWTCookie from "../JWTCookie/guestJWTCookie.js";

const {routePage} = config;

function decodeEventCode(path) {
	return Buffer.from(path, "base64").toString();
}

export default class GuestController {
	/**
	 *
	 * @param logger {object}
	 */
	constructor(logger) {
		this.logger = logger;
	}

	/**
	 *
	 * @param req {express.Request}
	 * @param res {express.Response}
	 * @return {Promise<void>}
	 */
	async logIn(req, res) {
		res.redirect(routePage.guest);
	}

	/**
	 *
	 * @param req {express.Request}
	 * @param res {express.Response}
	 * @return {Promise<void>}
	 */
	async logOut(req, res) {
		res.clearCookie(CookieKeys.GUEST_APP).redirect(routePage.main);
	}

	/**
	 *
	 * @param req {express.Request}
	 * @param res {express.Response}
	 * @return {Promise<void>}
	 */
	async signUp(req, res) {
		const path = req.params.encodedEventCode;
		const eventCode = decodeEventCode(path);
		const [isValid, event] = await validateEventCode(eventCode);

		if (!isValid) {
			return res.redirect(routePage.main);
		}

		// todo need try catch
		const eventId = event.id;
		const guest = await createGuest(eventId);

		const payload = {guestSid: guest.guestSid};
		const accessToken = guestJWTCookie.sign(payload);
		const cookieOption = JWTCooKieOptions.build();

		res.cookie(CookieKeys.GUEST_APP, accessToken, cookieOption);
		return res.redirect(routePage.guest);
	}
}
