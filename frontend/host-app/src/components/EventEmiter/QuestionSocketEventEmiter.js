import {socketClient} from "../../libs/socket.io-Client-wrapper";

// todo constant
const handleMoveQuestions = (EventId, from, to) => {
	socketClient.emit("questions/move", {from, to, EventId});
};

const handleMoveQuestion = (questions, id, from, to) => {
	const questionData = questions.questions.find(e => e.id === id);

	socketClient.emit("question/move", {id, from, to, data: questionData});
};

const handleStar = (questions, id) => {
	const toggleMsg = questions.questions.reduce(
		(acc, e) => {
			if (e.isStared) {
				acc.from.push({id: e.id, isStared: !e.isStared});
			}

			if (e.id === id) {
				acc.to.push({id: e.id, isStared: !e.isStared});
			}

			return acc;
		},
		{from: [], to: []},
	);

	socketClient.emit("question/toggleStar", toggleMsg);
};

export {handleMoveQuestion, handleStar, handleMoveQuestions};
