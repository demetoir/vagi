import {createLike} from "../../../DB/queries/like.js";

// todo test
const handler = async (data, emit) => {
	const {GuestId, QuestionId} = data;
	const result = await createLike({GuestId, QuestionId});

	emit(result);
};

const eventName = "questionLike/create";

export default {
	eventName,
	handler,
};
