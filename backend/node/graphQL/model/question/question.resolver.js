import {getQuestionsByEventId} from "../../../DB/queries/question.js";

// todo add auth guest, host
async function questionsResolver(_, {EventId}) {
	return getQuestionsByEventId(EventId);
}

export default {
	Query: {
		questions: questionsResolver,
	},
};
