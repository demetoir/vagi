import assert from "assert";
import {beforeEach, describe, it} from "mocha";
import sinon from "sinon";
import googleStrategyVerifyFunc from "../../../express/authentication/googleStrategyVerifyFunc.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {findHostByOAuthId} from "../../../DB/queries/host.js";

describe("googleStrategyVerifyFunc", () => {
	new SequelizeTestHelper().autoSetup();

	const callbackSpy = sinon.spy();

	beforeEach(() => {
		callbackSpy.resetHistory();
	});

	it("callback called with success", async () => {
		const accessToken = "accessToken";
		const refreshToken = "refreshToken";
		const oauthId = "1";
		const profile = {
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

		await googleStrategyVerifyFunc(
			accessToken,
			refreshToken,
			profile,
			callbackSpy,
		);

		assert(callbackSpy.calledOnce);
		const host = await findHostByOAuthId(oauthId);

		assert.deepStrictEqual(callbackSpy.args[0], [null, host]);
	});

	describe("callback called with error ", () => {
		it("on any error", async () => {
			const accessToken = "accessToken";
			const refreshToken = "refreshToken";
			const oauthId = 1;
			const invalidProfile = {
				id: oauthId,
			};

			await googleStrategyVerifyFunc(
				accessToken,
				refreshToken,
				invalidProfile,
				callbackSpy,
			);

			assert(callbackSpy.calledOnce);
			assert.notEqual(callbackSpy.args[0][0], null);
			assert.equal(callbackSpy.args[0][1], false);
		});
	});
});
