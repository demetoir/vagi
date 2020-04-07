import assert from "assert";
import {describe, it} from "mocha";
import superTest from "supertest";
import app from "../../express/app.js";
import config from "../../express/config";
import CookieJar from "../testHelper/CookieJar.js";

const agent = superTest.agent(app);

describe(`express app`, () => {
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
