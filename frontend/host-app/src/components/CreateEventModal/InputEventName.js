import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {validEventName} from "../../libs/eventValidation";
import {SET_ERROR_STATE, SET_PROPERTY} from "./eventModalActions.js";

const CustomTextField = styled(TextField)({
	marginTop: "1rem",
	width: 400,
});

function InputEventName(props) {
	const {dispatch, errorState, eventName} = props;

	const onChange = event => {
		dispatch({
			type: SET_ERROR_STATE,
			property: "eventName",
			value: !validEventName(event.target.value),
		});
		dispatch({
			type: SET_PROPERTY,
			property: "eventName",
			value: event.target.value,
		});
	};

	return (
		<CustomTextField
			id="eventName"
			label="이벤트 이름을 입력해주세요"
			color="primary"
			error={errorState.eventName}
			value={eventName}
			onChange={onChange}
			autoFocus
		/>
	);
}

export default InputEventName;
