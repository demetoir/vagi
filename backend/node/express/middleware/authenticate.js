import jwt from "jsonwebtoken";
import config from "../config";
import {isExistGuest} from "../../DB/queries/guest";
import {convertPathToEventCode, isActiveEvent} from "../utils";
import logger from "../logger.js";
import CookieKeys from "../CookieKeys.js";
import {isExistHostOAuthId} from "../../DB/queries/host.js";
import {getEventByEventCode} from "../../DB/queries/event.js";

const {tokenArgs, routePage} = config;

function isGuestBelongToEvent(guest, event) {
	return guest.EventId === event.id;
}

export function guestAuthenticate() {
	return async function(req, res, next) {
		const path = req.params.path;
		const eventCode = convertPathToEventCode(path);

		try {
			const payload = jwt.verify(
				req.cookies[CookieKeys.GUEST_APP],
				tokenArgs.secret,
			);

			const guest = await isExistGuest(payload.sub);
			const event = await getEventByEventCode(eventCode);

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
	};
}

export function hostAuthenticate() {
	return async function(req, res, next) {
		try {
			const payload = jwt.verify(
				req.cookies[CookieKeys.HOST_APP],
				tokenArgs.secret,
			);
			const isExist = await isExistHostOAuthId(payload.sub);

			if (isExist) {
				res.redirect(routePage.host);
			}

			return next();
		} catch (e) {
			logger.error(e);
			return next();
		}
	};
}
