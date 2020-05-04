import {deleteVoteBy} from "../../../DB/queries/vote";
import logger from "../../logger.js";
import {
	SOCKET_IO_RESPONSE_STATE_ERROR,
	SOCKET_IO_RESPONSE_STATE_OK,
} from "../../../constants/socket.ioResponseState.js";
import updateVoters from "./updateVoters.js";

// todo test
// todo add validation
const voteOffSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll} = data;

		await deleteVoteBy({
			GuestId,
			CandidateId,
		});

		const updatedPoll = await updateVoters(poll);

		const res = {
			status: SOCKET_IO_RESPONSE_STATE_OK,
			GuestId,
			poll: updatedPoll,
		};

		emit(res);
	} catch (e) {
		logger.error(e);
		emit({status: SOCKET_IO_RESPONSE_STATE_ERROR, e});
	}
};

const eventName = "vote/off";

export default {
	eventName,
	handler: voteOffSocketHandler,
};
