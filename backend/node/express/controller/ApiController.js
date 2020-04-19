import jwt from "jsonwebtoken";
import btoa from "btoa";
import validateEventCode from "../validator/validateEventCode.js";
import guestJWTCookie from "../JWTCookie/guestJWTCookie.js";
import hostJWTCookie from "../JWTCookie/hostJWTCookie.js";
import {guestQuery, hostQuery} from "../../DB/modelQuerys";
import config from "../config";

// todo test and refactoring
function decodeEventCode(encodedEventCode) {
	const result = Buffer.from(encodedEventCode, "base64").toString();
	const reverse = btoa(result);

	if (reverse !== encodedEventCode) {
		throw new Error("can not decode eventCode");
	}

	return result;
}


export default class ApiController {
	/**
	 *
	 * @param logger {object}
	 */
	constructor(logger = console) {
		this.logger = logger;
	}

	// todo test
	getEvent() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 * @return {Promise<void>}
		 */
		return async (req, res) => {
			const encodedEventCode = req.query.encodedEventCode || null;

			if (encodedEventCode === null) {
				throw new Error("encodedEventCode not found in request.params");
			}

			const eventCode = decodeEventCode(encodedEventCode);
			const [isValid, event] = await validateEventCode(eventCode);

			if (!isValid) {
				this.logger.info("sign up fail invalid eventCode");

				return res
					.status(400)
					.send({error: "sign up fail invalid eventCode"});
			}

			return res.status(200).send(event);
		};
	}

	// todo test
	postGuestToken() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 * @return {Promise<void>}
		 */
		return async (req, res) => {
			const guestSid = req.cookies.guestSid || null;

			if (guestSid === null) {
				this.logger.info(`expect guestSid in cookie, but not exist`);

				return res.status(400).data({
					error: `expect guestSid in cookie, but not exist`,
				});
			}

			const guest = await guestQuery.findByGuestSid(guestSid);

			if (guest === null) {
				this.logger.info(`notExist guest of guestSid: ${guestSid}`);

				return res
					.status(404)
					.data({error: `notExist guest of guestSid: ${guestSid}`});
			}

			const payload = {...guest};
			const accessToken = guestJWTCookie.sign(payload);

			this.logger.info(`guestSid:${guestSid} issue new token`);
			return res.send({token: accessToken, guest});
		};
	}

	// todo test
	postHostToken() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 * @return {Promise<void>}
		 */
		return async (req, res) => {
			const token = req.cookies.hostRefreshToken || null;

			if (token === null) {
				this.logger.info(
					`expect hostRefreshToken in cookie, but not exist`,
				);

				return res.status(400).data({
					error: `expect hostRefreshToken in cookie, but not exist`,
				});
			}

			let payload = null;

			try {
				const {tokenArgs} = config;

				payload = jwt.verify(token, tokenArgs.secret);
			} catch (e) {
				this.logger.info(`invalid hostRefreshToken in cookie`);
				return res.status(400).data({
					error: `invalid hostRefreshToken in cookie`,
				});
			}

			const {oauthId} = payload;
			const host = await hostQuery.findByOAuthId(oauthId);

			if (host === null) {
				this.logger.info(`notExist guest of oauthId: ${oauthId}`);

				return res
					.status(404)
					.data({error: `notExist guest of oauthId: ${oauthId}`});
			}

			const accessToken = hostJWTCookie.sign({...host});

			this.logger.info(`host oauthId:${oauthId} issue new access token`);
			return res.send({token: accessToken, host});
		};
	}
}
