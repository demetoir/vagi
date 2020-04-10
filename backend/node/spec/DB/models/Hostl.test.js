import {describe, it} from "mocha";
import assert from "assert";
import {findHostByOAuthId} from "../../../DB/queries/host.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {Host} from "../../../DB/modelsSingleton.js";

describe("DB Host", () => {
	new SequelizeTestHelper().autoSetup();

	it("sequelize setup", async () => {
		assert.notEqual(Host, null);
	});

	it("be able to find host by oauth id", async () => {
		// given
		const oauthId = "1234";
		const image = "image";
		const name = "name";
		const email = "email";
		const existHost = await Host.findOrCreatByOAuth({
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
		const host = await Host.findByOAuthId(oauthId);

		// than
		assert(host === null);
	});
});
