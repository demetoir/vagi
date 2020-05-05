import React from "react";
import {styled} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";

const Container = styled(Box)({
	marginTop: "1rem",
	marginLeft: "0.6rem",
	marginBottom: "1rem",
	display: "flex",
	flexDirection: "row",
});

function ReplyQuestionDivider(props) {
	const {replies} = props;

	return (
		<Container>
			<Typography variant="subtitle1">{`댓글 ${replies.length}개`}</Typography>
		</Container>
	);
}

export default ReplyQuestionDivider;
