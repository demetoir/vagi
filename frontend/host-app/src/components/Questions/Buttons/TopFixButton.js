import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import {handleStar} from "../../EventEmiter/QuestionSocketEventEmiter";
import useButtonStyles from "./useButtonStyles.js";

function TopFixButton(props) {
	const classes = useButtonStyles();
	const onClick = () => handleStar(props.data, props.id);

	return (
		<Tooltip title={"상단 고정"}>
			<Icon className={classes.starButton} onClick={onClick}>
				stars
			</Icon>
		</Tooltip>
	);
}

export default TopFixButton;
