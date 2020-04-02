import jwt from "jsonwebtoken";
import config from "../config";
import {isExistGuest} from "../../DB/queries/guest";
import {convertPathToEventCode, isActiveEvent} from "../utils";
import logger from "../logger.js";
import CookieKeys from "../CookieKeys.js";
import {getEventByEventCode} from "../../DB/queries/event.js";

const {tokenArgs, routePage} = config;

function isGuestBelongToEvent(guest, event) {
	return guest.EventId === event.id;
}

export default async function(req, res, next) {
	const path = req.params.path;
	const eventCode = convertPathToEventCode(path);

	try {
		const payload = jwt.verify(
			req.cookies[CookieKeys.GUEST_APP],
			tokenArgs.secret,
		);

		const [guest, event] = Promise.all(
			[isExistGuest(payload.sub), getEventByEventCode(eventCode)],
		);

		// todo better logic flow
		if (!isActiveEvent(event)) {
			// todo fix this line of lint
			throw new Error("이벤트 만료기간이 지났습니다.");
		}

		if (!isGuestBelongToEvent(guest, event)) {
			return res.redirect(routePage.guest);
		}

		return next();
	} catch (e) {
		logger.error(e);
		return next();
	}
}

