import {updateQuestionIsStared} from "../../../DB/queries/question";
import logger from "../../logger.js";
import {SOCKET_IO_RESPONSE_STATE_ERROR} from "../../../constants/socket.ioResponseState.js";

function toDto({on = {}, off = {}}) {
	return {
		on: {id: on.id},
		off: {id: off.id},
	};
}

// todo test
const toggleStarSocketHandler = async (data, emit) => {
	try {
		const {on, off} = toDto(data);

		await updateQuestionIsStared({from: off.id, to: on.id});

		const res = {
			off: {...off, isStared: false},
			on: {...on, isStared: true},
		};

		emit(res);
	} catch (e) {
		logger.error(e, e.stack);

		emit({status: SOCKET_IO_RESPONSE_STATE_ERROR, e});
	}
};

const eventName = "question/toggleStar";

export default {
	eventName,
	handler: toggleStarSocketHandler,
};
