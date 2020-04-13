import assert from "assert";
import sinon from "sinon";
import {describe, it} from "mocha";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import authenticate from "../../../socket_io_server/middleware/authenticate.js";

describe("socket middleware authenticate", () => {
	new SequelizeTestHelper().autoSetup();

	const socketSpy = sinon.spy();
	const nextSpy = sinon.spy();

	let context = {};

	it("pass", () => {
		const a = authenticate();

		assert(true);
	});

	describe("fail", () => {
		it("on token not found", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});

		it("on jwt malformed", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});

		it("on invalid JWTPayload", () => {
			const a = authenticate();

			// todo test
			assert(true);
		});
	});
});
