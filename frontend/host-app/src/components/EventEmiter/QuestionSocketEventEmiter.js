import {socketClient} from "../../libs/socket.io-Client-wrapper";
import {SOCKET_IO_EVENT} from "../../constants/socket.io-Events.js";

// todo constant
const handleMoveQuestions = (EventId, from, to) => {
	socketClient.emit("questions/move", {from, to, EventId});
};

const handleMoveQuestion = (questions, id, from, to) => {
	const questionData = questions.questions.find(e => e.id === id);

	socketClient.emit("question/move", {id, from, to, data: questionData});
};

const handleStar = (data, id) => {
	const staredQuestion = data.questions.find(x => x.isStared);
	const targetQuestion = data.questions.find(x => x.id === id);

	let req;

	if (targetQuestion.isStared) {
		req = {off: targetQuestion};
	} else {
		req = {on: targetQuestion, off: staredQuestion};
	}

	socketClient.emit(SOCKET_IO_EVENT.TOGGLE_STAR, req);
};

export {handleMoveQuestion, handleStar, handleMoveQuestions};
