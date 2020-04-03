import {openPoll} from "../../../DB/queries/poll";
import logger from "../../logger.js";
import {status} from "../../../constants/socket.ioResponseState.js";

const openPollSocketHandler = async (data, emit) => {
	try {
		const {pollId} = data;
		const affectedRows = await openPoll(pollId);

		if (affectedRows !== 1) {
			logger.error(
				`Something wrong with poll/open: affected number of rows = ${affectedRows}`,
			);
			return emit({status: status.ERROR});
		}

		return emit({status: status.SUCCESS, pollId});
	} catch (e) {
		logger.error(e);
		return emit({status: status.ERROR, e});
	}
};

const eventName = "poll/open";

export default {
	eventName,
	handler: openPollSocketHandler,
};
