import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../authentication/token";
import config from "../config";
import {guestAuthenticate} from "../middleware/authenticate";
import {createGuest, isExistGuest} from "../../DB/queries/guest";
import {convertPathToEventCode, getTokenExpired, isActiveEvent} from "../utils";
import CookieKeys from "../CookieKeys.js";
import logger from "../logger.js";
import {AUTHORITY_TYPE_GUEST} from "../../constants/authorityTypes.js";
import {getEventByEventCode} from "../../DB/queries/event.js";


const {routePage, tokenArgs} = config;
const router = express.Router();
// todo do somthing
const cookieExpireTime = 2;

router.get("/", async (req, res) => {
	try {
		const payload = jwt.verify(
			req.cookies[CookieKeys.GUEST_APP],
			tokenArgs.secret,
		);

		const guest = await isExistGuest(payload.sub);

		if (!guest) {
			// todo fix this line of lint
			throw Error("Guest is not found");
		}

		res.redirect(routePage.guest);
	} catch (e) {
		logger.error([e, e.stack]);
		res.redirect(routePage.main);
	}
});

router.get("/logout", (req, res) => {
	res.clearCookie(CookieKeys.GUEST_APP).redirect(routePage.main);
});

router.get("/:path", guestAuthenticate(), async (req, res) => {
	const path = req.params.path;
	const eventCode = convertPathToEventCode(path);

	try {
		const event = await getEventByEventCode(eventCode);

		if (!isActiveEvent(event)) {
			// todo fix this line of lint
			throw new Error("이벤트 만료기간이 지났습니다.");
		}

		const eventId = event.id;
		const guest = await createGuest(eventId);
		const accessToken = generateAccessToken(
			guest.guestSid,
			AUTHORITY_TYPE_GUEST,
		);

		res.cookie(CookieKeys.GUEST_APP, accessToken, {
			expires: getTokenExpired(cookieExpireTime),
		});
		res.redirect(routePage.guest);
	} catch (e) {
		logger.error([e, e.stack]);
		res.redirect(routePage.main);
	}
});

module.exports = router;
