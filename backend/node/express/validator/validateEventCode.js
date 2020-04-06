import {getEventByEventCode} from "../../DB/queries/event.js";
import Validator from "./Validator.js";

/**
 *
 * @param eventCode {string}
 * @return {Promise<boolean[]|(boolean|Object)[]>}
 */
export default async function validateEventCode(eventCode) {
	try {
		const event = await getEventByEventCode(eventCode);

		Validator.isExistEvent(event);
		Validator.isActiveEvent(event);

		return [true, event];
	} catch (e) {
		return [false, null];
	}
}
