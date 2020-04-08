import assert from "assert";
import {after, afterEach, before, describe, it} from "mocha";
import passport from "passport";
import parse from "url-parse";
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
	const oauthId = "1234";

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

	before(async () => {
		await Promise.all([sequelizeMock.setup()]);
	});

	after(async () => {
		await Promise.all([sequelizeMock.teardown()]);
	});

	afterEach(async () => {
		await sequelizeMock.dropAllAfterEach();
	});

	describe(`route  /auth/login`, () => {
		const baseURL = "/auth/login";

		it("should be able to redirect to AuthorizationURL ", async () => {
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

	describe(`route /auth/google/callback`, () => {
		const baseURL = "/auth/google/callback";

		// todo 주소로 요청시 google auth는 authorization URL로 가서  oauth pass이후  이링크로 다시 오는 과정이 생략되었다..
		// todo 그래서 원래 redirect location이 callbackURL이 아닌 authorization URL로 되어야한다
		it("should be able to redirect callbackURL after oauth passed", async () => {
			const url = `${baseURL}`;

			await agent.get(url).expect(res => {
				assert.equal(res.status, 302);

				const location = res.headers.location;
				const parsedUrl = parse(location);
				const redirectURL = `${parsedUrl.origin}${parsedUrl.pathname}`;

				assert.equal(redirectURL, config.oAuthArgs.callbackURL);
			});
		});

		it("should be able to redirect host-app after jwt issued", async () => {
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
