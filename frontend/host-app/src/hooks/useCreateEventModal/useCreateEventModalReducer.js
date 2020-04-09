import {useReducer} from "react";
import moment from "moment";
import createEventModalReducer from "./createEventModalReducer.js";

function buildInitialEventInfo(hostName) {
	const startDate = new Date();
	const endDate = moment(startDate)
		.add(1, "h")
		.toDate();

	return {
		eventName: `${hostName}님의 이벤트`,
		startDate,
		endDate,
		hashTags: [],
		errorState: {eventName: false, date: false},
	};
}

export default function useCreateEventModalReducer(hostName) {
	const initialValue = buildInitialEventInfo(hostName);
	const [eventForm, dispatch] = useReducer(
		createEventModalReducer,
		initialValue,
	);

	return [eventForm, dispatch];
}
