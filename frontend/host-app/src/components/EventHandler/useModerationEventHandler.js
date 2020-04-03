import {useSocket} from "../../libs/socket.io-Client-wrapper";

// todo constant
const useModerationEventHandler = stateHandler => {
	useSocket("moderation/toggle", req => {
		stateHandler(req.state);
	});
};

export default useModerationEventHandler;
