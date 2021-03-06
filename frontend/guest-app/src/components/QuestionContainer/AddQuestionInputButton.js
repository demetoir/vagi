import React from "react";
import PropTypes from "prop-types";
import {Card, CardContent} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const backgroundColorBlue = "#3f51b5";
const cardStyle = {
	width: "calc(100% - 2rem)",
	position: "fixed",
	bottom: "0",
	left: "0rem",
	zIndex: 100,
	margin: "1rem",
	backgroundColor: backgroundColorBlue,
	cursor: "pointer",
};

const cardContentStyle = {paddingBottom: "1rem"};

function AddQuestionInputButton(props) {
	const {onClick} = props;

	return (
		<Card style={cardStyle} onClick={onClick}>
			<CardContent style={cardContentStyle}>
				<div style={{color: "white"}}>
					<EditIcon style={{marginRight: "8px"}} />
					질문하기
				</div>
			</CardContent>
		</Card>
	);
}

AddQuestionInputButton.propTypes = {
	onClick: PropTypes.func,
};

export default AddQuestionInputButton;
