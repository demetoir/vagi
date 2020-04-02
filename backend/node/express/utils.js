import moment from "moment";


export function isActiveEvent(event) {
	const endAt = moment(event.endAt);
	const current = moment();
	const diff = endAt.diff(current, "minute");

	return diff > 0;
}


export function convertPathToEventCode(path) {
	return Buffer.from(path, "base64").toString();
}


export const getTokenExpired = hour =>
	new Date(new Date().getTime() + 1000 * 60 * 60 * Number(hour));
