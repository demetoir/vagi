import {
	findOrCreateEvent,
	getEventById,
	getEventOptionByEventId,
	getEventsByHostId,
	updateEventById,
} from "../../../DB/queries/event.js";
import {
	createHashtags,
	getHashtagByEventIds,
} from "../../../DB/queries/hashtag.js";
import RandomEventCodeGenerator from "../../../libs/RandomEventCodeGenerator.js";

const randomEventCodeGenerator = new RandomEventCodeGenerator();

const getEventOptionResolver = async (_, {EventId}) =>
	getEventOptionByEventId(EventId);

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
const hostGlobalDataQueryResolver = async (_, {param}, authority) => {
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

	const eventCode = await randomEventCodeGenerator.generate();
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
		init: hostGlobalDataQueryResolver,
		getEventOption: getEventOptionResolver,
	},

	Mutation: {
		createHashTags: createHashTagsResolver,
		createEvent: createEventResolver,
		updateEvent: updateEventResolver,
	},
};
