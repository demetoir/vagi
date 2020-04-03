import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";
import {handleMoveQuestion} from "../../EventEmiter/QuestionSocketEventEmiter.js";

// todo refactoring
function QuestionRestoreButton(props) {
	const classes = useStyles();
	const onClick = () => handleMoveQuestion(props.data, props.id, props.type, "active");

	return (
		<>
			<Tooltip title="질문 되살리기">
				<Icon
					className={classes.restoreButton}
					onClick={onClick}>
					restore
				</Icon>
			</Tooltip>
		</>
	);
}
export default QuestionRestoreButton;

