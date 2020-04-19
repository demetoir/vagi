import {describe, it} from "mocha";
import assert from "assert";
import {
	findHostByOAuthId,
	findOrCreateHostByOAuth,
} from "../../../DB/queries/host.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";

describe("host query api", () => {
	new SequelizeTestHelper().autoSetup();

	it("be able to find or create host by oauthId", async () => {
		const oauthId = "1234";
		const image = "image";
		const name = "name";
		const email = "email";
		const host = await findOrCreateHostByOAuth({
			oauthId,
			image,
			email,
			name,
		});

		assert(host.id > 0);
		assert.equal(host.email, email);
		assert.equal(host.name, name);
		assert.equal(host.image, image);
		assert.equal(host.oauthId, oauthId);
	});

	it("be able to find host by oauth id", async () => {
		// given
		const oauthId = "1234";
		const image = "image";
		const name = "name";
		const email = "email";
		const existHost = await findOrCreateHostByOAuth({
			oauthId,
			image,
			email,
			name,
		});

		// when
		const host = await findHostByOAuthId(oauthId);

		// than
		assert.deepStrictEqual(existHost, host);
	});

	it("be able to return null when can not find host by oauth id", async () => {
		// given
		const oauthId = "not exist";

		// when
		const host = await findHostByOAuthId(oauthId);

		// than
		assert(host === null);
	});
});
