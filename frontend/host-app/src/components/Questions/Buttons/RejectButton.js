import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";
import {handleMoveQuestion} from "../../EventEmiter/QuestionSocketEventEmiter.js";

// todo refactoring
function RejectButton(props) {
	const classes = useStyles();
	const onClick = () => handleMoveQuestion(props.data, props.id, props.type, "delete");

	return (
		<>
			<Tooltip title="거절">
				<Icon
					className={classes.cancelButton}
					onClick={onClick}>
					highlight_off
				</Icon>
			</Tooltip>
		</>
	);
}
export default RejectButton;

