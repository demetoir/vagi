import faker from "faker";
import {eventQuery} from "../DB/modelQuerys";

// todo test me
// todo di?
// todo singleton
// todo lint
export default class RandomEventCodeGenerator {
	getCode() {
		return faker.random.alphaNumeric(4);
	}

	async generate() {
		let code;
		let event;

		while (true) {
			code = this.getCode();

			event = await eventQuery.findOneByEventCode(code);

			if (event === null) {
				break;
			}
		}

		return code;
	}
}
