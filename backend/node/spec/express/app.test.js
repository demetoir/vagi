import assert from "assert";
import {afterEach, describe, it, beforeEach} from "mocha";
import passport from "passport";
import parse from "url-parse";
import superTest from "supertest";
import App from "../../express/app.js";
import config from "../../express/config";
import CookiePot from "../testHelper/CookiePot.js";
import SequelizeTestHelper from "../testHelper/SequelizeTestHelper.js";
import guestJWTCookie from "../../express/JWTCookie/guestJWTCookie";
import EventFixtures from "../fixtures/EventFixtures.js";
import GuestFixtures from "../fixtures/GuestFixtures.js";

const app = App(config);

describe(`express app`, () => {
	// todo better way to test oauth
	new SequelizeTestHelper().autoSetup();
	const oauthId = "1234";
	let agent;
	const cookieKey = "vaagle-guest";

	const cookiePot = new CookiePot();
	const strategy = passport._strategies.google;

	strategy._token_response = {
		access_token: "at-1234",
		expires_in: 3600,
	};
	strategy._profile = {
		id: oauthId,
		provider: "google",
		displayName: "John Doe",
		emails: [{value: "john.doe@email.com"}],
		photos: [
			{
				value: "https://via.placeholder.com/350x150",
			},
		],
	};

	beforeEach(() => {
		agent = superTest.agent(app);
	});

	afterEach(async () => {
		cookiePot.reset();
	});

	describe(`get /auth/google/login`, () => {
		const baseURL = "/auth/google/login";

		it("redirect to AuthorizationURL ", async () => {
			const url = `${baseURL}`;

			await agent.get(url).expect(res => {
				assert.equal(res.status, 302);
				const location = res.headers.location;
				const parsedUrl = parse(location);
				const expectURL = `${parsedUrl.origin}${parsedUrl.pathname}`;

				assert.equal(expectURL, config.oAuthArgs.callbackURL);
			});
		});
	});

	describe(`get /auth/google/callback`, () => {
		const baseURL = "/auth/google/callback";

		// todo 주소로 요청시 google auth는 authorization URL로 가서  oauth pass이후  이링크로 다시 오는 과정이 생략되었다..
		// todo 그래서 원래 redirect location이 callbackURL이 아닌 authorization URL로 되어야한다
		it("redirect callbackURL after oauth passed", async () => {
			const url = `${baseURL}`;

			await agent.get(url).expect(res => {
				assert.equal(res.status, 302);

				const location = res.headers.location;
				const parsedUrl = parse(location);
				const redirectURL = `${parsedUrl.origin}${parsedUrl.pathname}`;

				assert.equal(redirectURL, config.oAuthArgs.callbackURL);
			});
		});

		it("redirect host-app after jwt issued", async () => {
			const url = `${baseURL}?__mock_strategy_callback=true`;

			await agent.get(url).expect(res => {
				assert.equal(res.status, 302);

				const location = res.headers.location;
				const parsedUrl = parse(location);
				const redirectURL = `${parsedUrl.origin}${parsedUrl.pathname}`;

				assert.equal(redirectURL, config.routePage.host);
			});
		});
	});

	describe("get `/guest`", () => {
		const url = "/guest";

		describe("redirect to guest app", () => {
			it("on success", async () => {
				const event = await EventFixtures.activeEvent();
				const guest = await GuestFixtures.guest(event);
				const payload = {guestSid: guest.guestSid};
				const token = guestJWTCookie.sign(payload);

				cookiePot.set(cookieKey, token);

				await agent
					.get(url)
					.set("Cookie", [cookiePot.toEncodedString()])
					.expect(res => {
						assert.equal(res.status, 302);
						assert.equal(
							res.headers.location,
							config.routePage.guest,
						);
					});
			});
		});

		describe("redirect to main app", () => {
			it("on jwt cookie not found", async () => {
				await agent.get(url).expect(res => {
					assert.equal(res.status, 302);
					assert.equal(res.headers.location, config.routePage.main);
				});
			});


			it("on jwt malformed", async () => {
				const token = "malformed jwt";

				cookiePot.set(cookieKey, token);

				await agent
					.get(url)
					.set("Cookie", [cookiePot.toEncodedString()])
					.expect(res => {
						assert.equal(res.status, 302);
						assert.equal(
							res.headers.location,
							config.routePage.main,
						);
					});
			});

			it("on not exist event", async () => {
				const guest = await GuestFixtures.guest();
				const payload = {guestSid: guest.guestSid};
				const token = guestJWTCookie.sign(payload);

				cookiePot.set(cookieKey, token);

				await agent
					.get(url)
					.set("Cookie", [cookiePot.toEncodedString()])
					.expect(res => {
						assert.equal(res.status, 302);
						assert.equal(
							res.headers.location,
							config.routePage.main,
						);
					});
			});

			it("on closed event", async () => {
				const event = await EventFixtures.closedEvent();
				const guest = await GuestFixtures.guest(event);
				const payload = {guestSid: guest.guestSid};
				const token = guestJWTCookie.sign(payload);

				cookiePot.set(cookieKey, token);

				await agent
					.get(url)
					.set("Cookie", [cookiePot.toEncodedString()])
					.expect(res => {
						assert.equal(res.status, 302);
						assert.equal(
							res.headers.location,
							config.routePage.main,
						);
					});
			});
		});
	});
});
