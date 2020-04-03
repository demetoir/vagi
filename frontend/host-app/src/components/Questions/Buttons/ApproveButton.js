import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";
import {handleMoveQuestion} from "../../EventEmiter/QuestionSocketEventEmiter.js";

// todo refactoring
function ApproveButton(props) {
	const classes = useStyles();
	const onClick = () => handleMoveQuestion(props.data, props.id, props.type, "active");

	return (
		<Tooltip title="승인">
			<Icon
				className={classes.approveButton}
				onClick={onClick}>
				check_circle_outline
			</Icon>
		</Tooltip>
	);
}

export default ApproveButton;

