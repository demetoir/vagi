import {withStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import React from "react";

const StyledTextField = withStyles({
	root: {
		width: "300px",
	},
})(TextField);

export default function EventCodeInput({onChange, code, onEnterKeyPress}) {
	return (
		<StyledTextField
			required
			autoFocus
			id="outlined-basic"
			name="eventCode"
			margin="normal"
			variant="outlined"
			placeholder="이벤트 코드를 입력하세요"
			onChange={onChange}
			value={code}
			onKeyPress={e => {
				if (e.key === "Enter" && onEnterKeyPress) {
					onEnterKeyPress();
				}
			}}
		/>
	);
}
