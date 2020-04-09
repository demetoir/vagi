import faker from "faker";
import {
	findOrCreateEvent,
	getAllEvents,
	getEventById,
	getEventOptionByEventId,
	getEventsByHostId,
	updateEventById,
} from "../../../DB/queries/event.js";
import {
	createHashtags,
	getHashtagByEventIds,
} from "../../../DB/queries/hashtag.js";

// todo do something
function mappingHashTagsToEvents(hashTags, events, eventMap) {
	hashTags.forEach(hashTag => {
		eventMap.get(hashTag.EventId).push(hashTag);
	});
	events.forEach(event => {
		Object.assign(event, {HashTags: eventMap.get(event.id)});
	});

	return events;
}

// todo do something
async function generateEventCode() {
	let generatedEventCode = faker.random.alphaNumeric(4);
	const events = await getAllEvents();
	const alreadyExistEventCode = events.map(event => event.eventCode);

	while (true) {
		const isExist = alreadyExistEventCode.some(
			someCode => generateEventCode === someCode,
		);

		if (!isExist) {
			break;
		}
		generatedEventCode = faker.random.alphaNumeric(4);
	}
	return generatedEventCode;
}

const getEventOptionResolver = async (_, {EventId}) =>
	getEventOptionByEventId(EventId);

// todo do something
const initQueryResolver = async (_, {param}, authority) => {
	// verifySubjectHostJwt(authority.sub);

	const host = authority;
	let events = await getEventsByHostId(host.id);

	const eventMap = new Map();
	const eventIdList = events.map(event => {
		eventMap.set(event.id, []);
		return event.id;
	});

	const hashTags = await getHashtagByEventIds(eventIdList);

	events = mappingHashTagsToEvents(hashTags, events, eventMap);

	return {events, host};
};

const createHashTagsResolver = async (_, {hashTags}, authority) =>
// verifySubjectHostJwt(authority.sub);

	createHashtags(hashTags);
const createEventResolver = async (_, {info}, authority) => {
	// verifySubjectHostJwt(authority.sub);

	const eventCode = await generateEventCode();
	const event = await findOrCreateEvent({
		eventName: info.eventName,
		eventCode,
		HostId: authority.id,
		startAt: info.startAt,
		endAt: info.endAt,
	});

	return {...event};
};

const updateEventResolver = async (_, {event}, authority) => {
	// verifySubjectHostJwt(authority.sub);

	await updateEventById({
		id: event.EventId,
		eventName: event.eventName,
		startAt: event.startAt,
		endAt: event.endAt,
	});

	return getEventById(event.EventId);
};

export default {
	Query: {
		init: initQueryResolver,
		getEventOption: getEventOptionResolver,
	},

	Mutation: {
		createHashTags: createHashTagsResolver,
		createEvent: createEventResolver,
		updateEvent: updateEventResolver,
	},
};
