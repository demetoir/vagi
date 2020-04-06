import {getGuestByGuestSid} from "../../DB/queries/guest.js";
import Validator from "./Validator.js";
import {getEventById} from "../../DB/queries/event.js";
import guestJWTCookie from "../JWTCookie/guestJWTCookie.js";

/**
 *
 * @param req {{jwtCookies: {}}}
 * @return {Promise<(boolean|*)[]|(boolean|{guest: Object, event: (Model<any, any>|any)})[]>}
 */
export default async function validateGuestJWT(req) {
	try {
		if (!("jwtCookies" in req)) {
			throw new Error("jwtCookies not found in request object");
		}

		const payload = guestJWTCookie.verify(req.jwtCookies);

		const guestSid = payload.guestSid;
		const guest = await getGuestByGuestSid(guestSid);

		Validator.isExistGuest(guest);

		const EventId = guest.EventId;
		const event = await getEventById(EventId);

		Validator.isExistEvent(event);
		Validator.isActiveEvent(event);
		Validator.isGuestBelongToEvent(guest, event);


		return [true, {event, guest}];
	} catch (e) {
		return [false, e];
	}
}
