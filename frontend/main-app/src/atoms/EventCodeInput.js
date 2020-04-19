import {withStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import React, {useState} from "react";

const StyledTextField = withStyles({
	root: {
		width: "300px",
	},
})(TextField);

const initialEventCode = "";

export default function EventCodeInput({onChange, onEnterKeyPress, inputRef}) {
	const [value, setValue] = useState(initialEventCode);

	return (
		<StyledTextField
			required
			autoFocus
			id="outlined-basic"
			name="eventCode"
			margin="normal"
			variant="outlined"
			placeholder="이벤트 코드를 입력하세요"
			inputRef={inputRef}
			value={value}
			onChange={e => {
				setValue(e.target.value);

				onChange(e);
			}}
			onKeyPress={e => {
				if (e.key === "Enter" && onEnterKeyPress) {
					onEnterKeyPress();
				}
			}}
		/>
	);
}
