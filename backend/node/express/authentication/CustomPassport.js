import passport from "passport";
import config from "../config";
import googleStrategy from "./googleStrategy.js";

const {oAuthArgs} = config;

export default function customPassport() {
	passport.use(googleStrategy(oAuthArgs));

	return passport.initialize();
}
