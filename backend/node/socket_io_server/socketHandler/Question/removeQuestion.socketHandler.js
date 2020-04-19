import {deleteQuestionById} from "../../../DB/queries/question";

// todo test
const createQuestionSocketHandler = async (data, emit) => {
	await deleteQuestionById(data.id);

	emit(data);
};

const eventName = "question/remove";

export default {
	eventName,
	handler: createQuestionSocketHandler,
};
