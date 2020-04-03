export default class VerifyGuestError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "VerifyGuestError";
	}
}
