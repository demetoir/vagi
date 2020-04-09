import assert from "assert";
import {describe, it} from "mocha";
import HostFixtures from "./HostFixtures.js";
import SequelizeTestHelper from "../testHelper/SequelizeTestHelper.js";
import {findHostByOAuthId} from "../../DB/queries/host.js";

describe(`host fixture`, () => {
	new SequelizeTestHelper().autoSetup();

	describe("create host ", () => {
		it("with out args", async () => {
			const host = await HostFixtures.host();

			const realHost = await findHostByOAuthId(null);

			assert.deepStrictEqual(host, realHost);
		});

		it("with arg oauth", async () => {
			const oAuthId = "ouathId";
			const host = await HostFixtures.host(oAuthId);

			const realHost = await findHostByOAuthId(oAuthId);

			assert.deepStrictEqual(host, realHost);
		});
	});
});
