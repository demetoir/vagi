export default class ParseGuestJWTError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "ParseGuestJWTError";
	}
}
