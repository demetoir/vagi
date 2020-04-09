import {updateEventById} from "../../../DB/queries/event";
import eventCache from "../../EventCache";
import logger from "../../logger.js";
import {SOCKET_IO_RESPONSE_STATE_ERROR} from "../../../constants/socket.ioResponseState.js";

async function updateEventCache(eventId, moderationOption) {
	const cached = await eventCache.get(eventId);

	cached.moderationOption = moderationOption;
	await eventCache.set(eventId, cached);
}

const toggleModerationSocketHandler = async (data, emit) => {
	try {
		const {eventId, state} = data;
		const updateEventByIdPromise = updateEventById({
			id: data.eventId,
			moderationOption: state,
		});
		const updateEventCachePromise = await updateEventCache(eventId, state);

		await Promise.all([updateEventByIdPromise, updateEventCachePromise]);

		emit({eventId, state});
	} catch (e) {
		logger.error(e);

		emit({status: SOCKET_IO_RESPONSE_STATE_ERROR, e});
	}
};

const eventName = "moderation/toggle";

export default {
	eventName,
	handler: toggleModerationSocketHandler,
};
