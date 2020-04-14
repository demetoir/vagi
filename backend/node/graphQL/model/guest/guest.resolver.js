import {
	getGuestsByEventId,
	getGuestByGuestSid,
} from "../../../DB/queries/guest.js";
import {getEventById} from "../../../DB/queries/event.js";

// todo add auth guest
const guestResolver = async (_, {EventId}) => getGuestsByEventId(EventId);


// todo add auth guest
const guestInEventResolver = async (_, args, authority) => {
	const guest = await getGuestByGuestSid(authority.guestSid);
	const event = await getEventById(guest.EventId);

	return {event, guest};
};

export default {
	Query: {
		guests: guestResolver,
		guestInEvent: guestInEventResolver,
	},
};
