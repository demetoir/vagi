import React from "react";
import PropTypes from "prop-types";
import gray from "@material-ui/core/colors/grey.js";
import QuestionCard from "./QuestionCard.js";

const style = {
	backgroundColor: gray[300],
	marginTop: "0",
	marginBottom: "0",
	paddingTop: "0.25rem",
	paddingBottom: "0.5rem",
};

function getReplisInQuestion(questionId, replies) {
	const repliesInQuestion = replies.filter(
		reply => reply.QuestionId === questionId,
	);

	return repliesInQuestion;
}

const QuestionCardList = React.memo(props => {
	const {questions, replies, listRef = undefined, viewState} = props;

	return (
		<div style={style} ref={listRef}>
			{questions.map((question, idx) => {
				return (
					<QuestionCard
						{...question}
						key={idx}
						replies={getReplisInQuestion(question.id, replies)}
						viewState={viewState}
					/>
				);
			})}
		</div>
	);
});

QuestionCardList.propTypes = {
	questions: PropTypes.array,
	replies: PropTypes.array,
};

QuestionCardList.defualtProps = {
	questions: [],
	replies: [],
};

export default QuestionCardList;
