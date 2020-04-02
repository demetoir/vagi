/* eslint-disable array-element-newline */
import _ from "lodash";
import {fileLoader, mergeTypes} from "merge-graphql-schemas";
import * as path from "path";

const emoji = fileLoader(path.join(__dirname, "./emoji/emoji.graphql"));
const guest = fileLoader(path.join(__dirname, "./guest/guest.graphql"));
const hello = fileLoader(path.join(__dirname, "./hello/hello.graphql"));
const hostpage = fileLoader(
	path.join(__dirname, "./hostpage/hostpage.graphql"),
);
const like = fileLoader(path.join(__dirname, "./like/like.graphql"));
const poll = fileLoader(path.join(__dirname, "./poll/poll.graphql"));
const question = fileLoader(
	path.join(__dirname, "./question/question.graphql"),
);

const typesArray = _.flatten([
	emoji,
	guest,
	hello,
	hostpage,
	like,
	poll,
	question,
]);

const typesMerged = mergeTypes(typesArray, {all: true});

export default typesMerged;
