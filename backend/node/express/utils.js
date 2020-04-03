import moment from "moment";

// todo refactoring location
export function isActiveEvent(event) {
	const endAt = moment(event.endAt);
	const current = moment();
	const diff = endAt.diff(current, "minute");

	return diff > 0;
}

// todo refactoring location
export function decodeEventCode(path) {
	return Buffer.from(path, "base64").toString();
}

// todo refactoring constant
export const getTokenExpired = hour =>
	new Date(new Date().getTime() + 1000 * 60 * 60 * Number(hour));
