import assert from "assert";
import {describe, it} from "mocha";
import CookiePot from "./CookiePot.js";

describe(`CookiePot`, () => {
	it("construct", async () => {
		const cookieJar = new CookiePot();

		assert.notEqual(cookieJar, undefined);
	});

	it("get", async () => {
		const cookieJar = new CookiePot();

		cookieJar.set("key", "value");

		const result = cookieJar.get("key");

		assert.equal(result, "value");
	});

	it("set", async () => {
		const cookieJar = new CookiePot();

		cookieJar.set("key", "value");

		assert.deepStrictEqual(cookieJar.cookies, {key: "value"});
	});

	it("toEncodedString", async () => {
		const cookieJar = new CookiePot();

		cookieJar.set("key1", "value1");
		cookieJar.set("key2", "value2");

		assert.equal(cookieJar.toEncodedString(), "key1=value1;key2=value2");
	});

	it("reset", async () => {
		const cookieJar = new CookiePot();

		cookieJar.set("key", "value");

		cookieJar.reset();
		assert.deepStrictEqual(cookieJar.cookies, {});
	});
});
