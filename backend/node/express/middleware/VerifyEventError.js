export default class VerifyEventError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "VerifyEventError";
	}
}
