import {closePoll} from "../../../DB/queries/poll";
import logger from "../../logger.js";
import {status} from "../../../constants/socket.ioResponseState.js";

const closePollSocketHandler = async (data, emit) => {
	try {
		const {pollId} = data;
		const affectedRows = await closePoll(pollId);

		if (affectedRows !== 1) {
			logger.error(
				`Something wrong with poll/close: affected number of rows = ${affectedRows}`,
			);

			return emit({status: status.ERROR});
		}

		return emit({status: status.SUCCESS, pollId});
	} catch (e) {
		logger.error(e);
		return emit({status: status.ERROR, e});
	}
};

const eventName = "poll/close";

export default {
	eventName,
	handler: closePollSocketHandler,
};
