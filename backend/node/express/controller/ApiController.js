import btoa from "btoa";
import validateEventCode from "../validator/validateEventCode.js";

// todo test and refactoring
function decodeEventCode(encodedEventCode) {
	const result = Buffer.from(encodedEventCode, "base64").toString();
	const reverse = btoa(result);

	if (reverse !== encodedEventCode) {
		throw new Error("can not decode eventCode");
	}

	return result;
}

// todo test
export default class ApiController {
	/**
	 *
	 * @param logger {object}
	 */
	constructor(logger = console) {
		this.logger = logger;
	}

	getEvent() {
		/**
		 *
		 * @param req {express.Request}
		 * @param res {express.Response}
		 * @return {Promise<void>}
		 */
		return async (req, res) => {
			const encodedEventCode = req.query.encodedEventCode || null;

			if (encodedEventCode === null) {
				throw new Error("encodedEventCode not found in request.params");
			}

			const eventCode = decodeEventCode(encodedEventCode);
			const [isValid, event] = await validateEventCode(eventCode);

			if (!isValid) {
				this.logger.info("sign up fail invalid eventCode");

				return res
					.status(400)
					.send({error: "sign up fail invalid eventCode"});
			}

			return res.status(200).send(event);
		};
	}
}
