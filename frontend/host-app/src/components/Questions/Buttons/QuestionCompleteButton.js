import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";
import {handleMoveQuestion} from "../../EventEmiter/QuestionSocketEventEmiter.js";

function QuestionCompleteButton(props) {
	const classes = useStyles();
	const onClick = () => handleMoveQuestion(props.data, props.id, props.type, "completeQuestion");

	return (
		<Tooltip title="답변 완료">
			<Icon
				className={classes.approveButton}
				onClick={onClick}>
					check_circle_outline
			</Icon>
		</Tooltip>
	);
}
export default QuestionCompleteButton;

