"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
// change config setting *.json to *.config.js
const config = require(path.resolve(__dirname, "../sequelize.config.js"))[env];

let sequelize;
// noinspection JSUnresolvedVariable
if (config.use_env_variable) {
	// noinspection JSValidateTypes,JSCheckFunctionSignatures
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	if (process.env.IS_DOCKER_CONTAINER) {
		config.host = config.containerName;
	}

	// noinspection JSValidateTypes
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config,
	);
}

// import es6 base sequelize model
// ref https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
// pass your sequelize config here
import Host from "./modelDefines/Host.js";
import Emoji from "./modelDefines/emoji.js";
import Event from "./modelDefines/event.js";
import Guest from "./modelDefines/guest.js";
import Hashtag from "./modelDefines/hashtag.js";
import Like from "./modelDefines/like.js";
import Poll from "./modelDefines/poll.js";
import Question from "./modelDefines/question.js";
import Vote from "./modelDefines/vote.js";
import Candidate from "./modelDefines/candidate.js";

// init all sequelize model
const models = {
	Host: Host.init(sequelize, Sequelize),
	Event: Event.init(sequelize, Sequelize),
	Emoji: Emoji.init(sequelize, Sequelize),
	Guest: Guest.init(sequelize, Sequelize),
	Hashtag: Hashtag.init(sequelize, Sequelize),
	Like: Like.init(sequelize, Sequelize),
	Poll: Poll.init(sequelize, Sequelize),
	Question: Question.init(sequelize, Sequelize),
	Vote: Vote.init(sequelize, Sequelize),
	Candidate: Candidate.init(sequelize, Sequelize),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
	.filter(model => typeof model.associate === "function")
	.forEach(model => model.associate(models));

const db = {
	// ...modelQuerys,
	sequelize,
	sequelizeSingleton: sequelize,
	modelsSingleton: models,
	modelList: Object.values(models),
	Host: models.Host,
	Event: models.Event,
	Emoji: models.Emoji,
	Guest: models.Guest,
	Hashtag: models.Hashtag,
	Like: models.Like,
	Poll: models.Poll,
	Question: models.Question,
	Vote: models.Vote,
	Candidate: models.Candidate,
};

module.exports = db;
