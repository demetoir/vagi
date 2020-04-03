import jwt from "jsonwebtoken";
import config from "../config";
import {getGuestByGuestSid} from "../../DB/queries/guest";
import {decodeEventCode} from "../utils";
import {getEventByEventCode} from "../../DB/queries/event.js";
import logger from "../logger.js";
import parseGuestJWt from "./parseGuestJWT.js";
import verifyEvent from "./verifyEvent.js";
import verifyGuest from "./verifyGuest.js";

const {tokenArgs, routePage} = config;

export default async function(req, res, next) {
	try {
		const guestJWT = parseGuestJWt(req);
		const payload = jwt.verify(
			guestJWT,
			tokenArgs.secret,
		);

		const guestSid = payload.sub;
		const encodedEventCode = req.params.path;
		const eventCode = decodeEventCode(encodedEventCode);
		const [guest, event] = await Promise.all(
			[getGuestByGuestSid(guestSid), getEventByEventCode(eventCode)],
		);

		verifyEvent(event);
		verifyGuest(guest, event);

		return res.redirect(routePage.guest);
	} catch (e) {
		logger.error(e, e.stack);
		return next();
	}
}

