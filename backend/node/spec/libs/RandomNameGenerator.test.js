import assert from "assert";
import {describe, it} from "mocha";
import RandomNameGenerator from "../../libs/RandomNameGenerator";

describe("RandomNameGenerator", () => {
	it("generate new one", () => {
		const name = RandomNameGenerator.generate();

		assert.equal(typeof name, "string");
	});
});
