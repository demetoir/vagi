import {deleteVoteBy} from "../../../DB/queries/vote";
import updateVoters from "./updateVoters";
import logger from "../../logger.js";
import {
	SOCKET_IO_RESPONSE_STATE_ERROR,
	SOCKET_IO_RESPONSE_STATE_OK,
} from "../../../constants/socket.ioResponseState.js";

// todo test
// todo add validation data
const rateOffSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll, index} = data;

		await deleteVoteBy({GuestId, CandidateId});
		const updatedPoll = await updateVoters(poll);

		const res = {
			status: SOCKET_IO_RESPONSE_STATE_OK,
			GuestId,
			poll: updatedPoll,
			index,
		};

		emit(res);
	} catch (e) {
		logger.error(e);
		emit({status: SOCKET_IO_RESPONSE_STATE_ERROR, e});
	}
};

const eventName = "rate/off";

export default {
	eventName,
	handler: rateOffSocketHandler,
};
