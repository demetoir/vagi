import {createGuest} from "../../DB/queries/guest.js";
import Validator from "../validator/Validator.js";
import CookieKeys from "../CookieKeys.js";
import {getEventByEventCode} from "../../DB/queries/event.js";
import generateAccessToken from "../authentication/token.js";
import {AUTHORITY_TYPE_GUEST} from "../../constants/authorityTypes.js";
import config from "../config";
import JWTCooKieOptions from "../JWTCookie/JWTCooKieOptions.js";

const {routePage} = config;


/**
 *
 * @param eventCode {string}
 * @return {Promise<boolean[]|(boolean|Object)[]>}
 */
async function validateEventCode(eventCode) {
	try {
		const event = await getEventByEventCode(eventCode);

		Validator.isExistEvent(event);
		Validator.isActiveEvent(event);

		return [true, event];
	} catch (e) {
		return [false, null];
	}
}


/**
 *
 * @param event {object}
 * @return {Promise<string>}
 */
async function createGuestJWT(event) {
	const eventId = event.id;
	const guest = await createGuest(eventId);

	return generateAccessToken(
		guest.guestSid,
		AUTHORITY_TYPE_GUEST,
	);
}


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
		this.logger.info("guest log out");
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
		const [isValidEventCode, event] = await validateEventCode(eventCode);

		if (!isValidEventCode) {
			return res.redirect(routePage.main);
		}

		const accessToken = await createGuestJWT(event);
		const cookieOption = JWTCooKieOptions.build();

		res.cookie(CookieKeys.GUEST_APP, accessToken, cookieOption);
		return res.redirect(routePage.guest);
	}
}
