import {deleteEmojiBy} from "../../../DB/queries/emoji.js";

// todo test
const removeEmojiSocketHandler = async (data, emit) => {
	const {GuestId, name, EventId, QuestionId} = data;

	await deleteEmojiBy({GuestId, name, EventId, QuestionId});

	emit(data);
};

const eventName = "questionEmoji/remove";

export default {
	eventName,
	handler: removeEmojiSocketHandler,
};
