import {createGuest} from "../../DB/queries/guest.js";

export default class GuestFixtures {
	static async guest(event = {}) {
		const EventId = event.id || null;

		return createGuest(EventId);
	}
}
