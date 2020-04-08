import {after, afterEach, before, describe} from "mocha";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";

describe("express guestAuth middleware", () => {
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
});
