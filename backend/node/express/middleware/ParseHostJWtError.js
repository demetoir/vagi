export default class ParseHostJWtError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "ParseHostJWtError";
	}
}
