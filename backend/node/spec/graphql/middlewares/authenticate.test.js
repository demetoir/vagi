import assert from "assert";
import sinon from "sinon";
import {describe, it} from "mocha";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import authenticate from "../../../graphQL/middlewares/authenticate.js";

describe("graphql middleware authenticate", () => {
	new SequelizeTestHelper().autoSetup();

	const resolverSpy = sinon.spy();
	const root = sinon.stub();
	const args = sinon.stub();
	const info = sinon.stub();

	let context = {};

	it("pass on valid guest", () => {
		const a = authenticate();

		assert(true);
	});

	it("pass on valid host", () => {
		const a = authenticate();

		assert(true);
	});

	describe("fail", () => {
		it("on context authorization not exist", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});

		it("on jwt token cant not parse ", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});

		it("on jwt malformed", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});

		it("on invalid audience", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});

		it("on invalid host oauthId", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});

		it("on invalid guest guestSid", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});
	});
});
