import {describe, it} from "mocha";
import CookieKeys from "../../../express/CookieKeys.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import verifyJWTPayload from "../../../socket_io_server/validator/verifyJWTPayload.js";

describe(`socket.io validator verifyJWTPayload`, () => {
	const cookieKey = CookieKeys.HOST_APP;

	new SequelizeTestHelper().autoSetup();

	it("is valid host", async () => {
		// todo test
		const a = verifyJWTPayload();
	});

	it("is valid guest", async () => {
		// todo test
		const a = verifyJWTPayload();
	});

	describe("is invalid", () => {
		it("on invalid iss", async () => {
			// todo test
			const a = verifyJWTPayload();
		});

		it("on invalid aud", async () => {
			// todo test
			const a = verifyJWTPayload();
		});

		it("on invalid guest guestSid", async () => {
			// todo test
			const a = verifyJWTPayload();
		});

		it("on invalid host guestSid", async () => {
			// todo test
			const a = verifyJWTPayload();
		});
	});
});
