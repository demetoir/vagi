export default class VerifyHostError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "VerifyHostError";
	}
}
