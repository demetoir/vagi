import {addVote, swapVoteByGuestId} from "../../../DB/queries/vote";
import updateVoters from "./updateVoters";
import logger from "../../logger.js";
import {
	SOCKET_IO_RESPONSE_STATE_ERROR,
	SOCKET_IO_RESPONSE_STATE_OK,
} from "../../../constants/socket.ioResponseState.js";

// todo test
// todo add validation
const voteOnSocketHandler = async (data, emit) => {
	try {
		const {
			GuestId,
			CandidateId,
			allowDuplication,
			poll,
			candidateToDelete,
		} = data;

		if (!allowDuplication && candidateToDelete) {
			await swapVoteByGuestId(GuestId, CandidateId, candidateToDelete);
		} else {
			await addVote({GuestId, CandidateId});
		}

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

const eventName = "vote/on";

export default {
	eventName,
	handler: voteOnSocketHandler,
};
