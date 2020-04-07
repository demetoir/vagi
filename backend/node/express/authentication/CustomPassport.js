import passport from "passport";
import googleStrategy from "./googleStrategy.js";

export default function customPassport(config) {
	const {oAuthArgs} = config;

	passport.use(googleStrategy(oAuthArgs));

	return passport.initialize();
}
