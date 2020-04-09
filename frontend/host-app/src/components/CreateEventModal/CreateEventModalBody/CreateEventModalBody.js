import React from "react";
import styled from "styled-components";
import InputEventName from "./InputEventName.js";
import DateInputsArea from "./DateInputsArea/DateInputsArea.js";
import HashTagsInputArea from "./HashTagArea/HashTagsInputArea.js";
import {propertyEventName, SET_ERROR_STATE, SET_PROPERTY} from "../../../hooks/useCreateEventModal/createEventModalActions.js";
import {isValidEventName} from "../../../libs/eventValidation.js";


const CreateEventModalBodyStyle = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 75%;
`;

const bindOnChangeEventName = dispatch => event => {
	const eventName = event.target.value;

	dispatch({
		type: SET_ERROR_STATE,
		property: propertyEventName,
		value: !isValidEventName(eventName),
	});

	dispatch({
		type: SET_PROPERTY,
		property: propertyEventName,
		value: eventName,
	});
};


export default function CreateEventModalBody({eventForm, dispatch}) {
	const InputEventNameProps = {
		onChange: bindOnChangeEventName(dispatch),
		error: eventForm.errorState.eventName,
		value: eventForm.eventName,
	};

	return <CreateEventModalBodyStyle>
		<InputEventName {...InputEventNameProps}/>
		<DateInputsArea dispatch={dispatch} eventForm={eventForm}/>
		<HashTagsInputArea hashTags={eventForm.hashTags} dispatch={dispatch}/>
	</CreateEventModalBodyStyle>;
}
