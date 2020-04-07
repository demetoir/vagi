import assert from "assert";
import {after, afterEach, before, describe, it} from "mocha";
import superTest from "supertest";
import App from "../../express/app.js";
import config from "../../express/config";
import CookieJar from "../testHelper/CookieJar.js";
import SequelizeTestHelper from "../testHelper/SequelizeTestHelper.js";

const app = App(config);
const agent = superTest.agent(app);

describe(`express app`, () => {
	// todo better way to test oauth

	const sequelizeMock = new SequelizeTestHelper();

	before(async () => {
		await Promise.all([sequelizeMock.setup()]);
	});

	after(async () => {
		await Promise.all([sequelizeMock.teardown()]);
	});

	afterEach(async () => {
		await sequelizeMock.dropAllAfterEach();
	});

	describe("route `/auth`", () => {
		it("should be able to `/auth/login`", async () => {
			const url = "/auth/login";

			await agent.get(url).expect(res => {
				assert.equal(res.status, 302);
				const location = res.headers.location;
				const redirectURL = new URL(location);

				assert.equal(redirectURL.host, "accounts.google.com");
			});
		});

		it("should be able to `/auth/google/callback`", async () => {
			const url = "/auth/google/callback";

			await agent.get(url).expect(res => {
				assert.equal(res.status, 302);

				const location = res.headers.location;
				const redirectURL = new URL(location);

				assert.equal(redirectURL.host, "accounts.google.com");
			});
		});
	});

	describe("route `/guest`", () => {
		describe("/guest", () => {
			it("should be able redirect on jwt cookie not found", async () => {
				const url = "/guest";

				await agent.get(url).expect(res => {
					assert.equal(res.status, 302);
					assert.equal(res.headers.location, config.routePage.main);
				});
			});

			it("should be able redirect on jwt malformed", async () => {
				const url = "/guest";
				const cookieJar = new CookieJar();
				const token = "malformed jwt";

				cookieJar.set("vaagle-guest", token);

				await agent
					.get(url)
					.set("Cookie", [cookieJar.toEncodedString()])
					.expect(res => {
						assert.equal(res.status, 302);
					});
			});
		});
	});
});
