import moment from "moment";
import useMutateEvent from "./useMutateEvent.js";
import useMutateHashtags from "./useMutateHashtags.js";

function buildMutateEventVariables(eventInfo, hostId) {
	function formattingDate(date) {
		return moment(date).format("YYYY-MM-DD HH:mm:ss");
	}


	return {
		info: {
			HostId: hostId,
			startAt: moment(
				formattingDate(eventInfo.startDate),
			).toDate(),
			endAt: moment(formattingDate(eventInfo.endDate)).toDate(),
			eventName: eventInfo.eventName,
		},
	};
}

function buildMutateHashTagsVariables(EventId, eventInfo) {
	const hashTags = eventInfo.hashTags.map(hashTag => ({
		name: hashTag.label,
		EventId,
	}));

	return {hashTags};
}

export default function useCreateEvent() {
	const [mutateEvent] = useMutateEvent();
	const [mutateHashTags] = useMutateHashtags();

	async function createEvent(eventInfo, hostId) {
		const mutateEventVariables = buildMutateEventVariables(eventInfo, hostId);
		const event = await mutateEvent(mutateEventVariables);

		const EventId = event.id;
		const mutateHashTagsVariable = buildMutateHashTagsVariables(EventId, eventInfo);
		const HashTags = await mutateHashTags(mutateHashTagsVariable);

		Object.assign(event, {HashTags});
		return event;
	}

	return [createEvent];
}
