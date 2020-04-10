import {Strategy as RealStrategy} from "passport-google-oauth20";
import {Strategy as MockStrategy} from "passport-mocked";
import googleStrategyVerifyFunc from "./googleStrategyVerifyFunc.js";

export default function googleStrategy(oAuthArgs) {
	let options = oAuthArgs;

	if (process.env.NODE_ENV === "test") {
		options = {
			...options,
			authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
			name: "google",
		};

		return new MockStrategy(options, googleStrategyVerifyFunc);
	} else {
		return new RealStrategy(options, googleStrategyVerifyFunc);
	}
}
