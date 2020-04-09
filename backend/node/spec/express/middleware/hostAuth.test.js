import {describe} from "mocha";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";

describe("express guestAuth middleware", () => {
	new SequelizeTestHelper().autoSetup();
});
