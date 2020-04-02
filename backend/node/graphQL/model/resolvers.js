/* eslint-disable array-element-newline */
import emojiResolvers from "./emoji/emoji.resolver.js";
import hostpageResolvers from "./hostpage/hostpage.resolver.js";
import guestResolvers from "./guest/guest.resolver.js";
import likeResolvers from "./like/like.resolver.js";
import questionResolvers from "./question/question.resolver.js";
import pollGuestResolvers from "./poll/pollGuest.resolver.js";
import pollHostResolvers from "./poll/pollHost.resolver.js";
import helloResolvers from "./hello/hello.resolver.js";

const resolvers = [
	emojiResolvers,
	hostpageResolvers,
	guestResolvers,
	likeResolvers,
	questionResolvers,
	pollGuestResolvers,
	pollHostResolvers,
	helloResolvers,
];

export default resolvers;
