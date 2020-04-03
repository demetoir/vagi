import React, {useContext, useReducer} from "react";
import {Modal} from "@material-ui/core";
import styled from "styled-components";
import moment from "moment";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import InputHashTag from "./InputHashTag";
import EndDateField from "./EndDateField";
import HashTagsField from "./HashTagsField";
import CreateEventModalFooter from "./CreateEventModalFooter.js";
import AlertSnackbar from "./AlertSnackbar";
import createEventModalReducer from "./createEventModalReducer.js";
import {HostContext} from "../../libs/hostContext";
import useSnackBar from "../../customhook/useSnackBar";
import {propertyEventName, SET_ERROR_STATE, SET_PROPERTY} from "./createEventModalActions.js";
import {isValidEventName} from "../../libs/eventValidation.js";
import CreateEventModalHeader from "./CreateEventModalHeader.js";
import useCreateEvent from "./useCreateEvent.js";

const modalHeight = 38;
const modalWidth = 28.125;
const PopUpLayOutStyle = styled.div`
	position: relative;
	top: calc(50% - ${modalHeight / 2}rem);
	left: calc(50% - ${modalWidth / 2}rem);
	display: flex;
	flex-direction: column;
	width: ${modalWidth}rem;
	height: ${modalHeight}rem;
	background-color: white;
	padding: 0 1.5rem;
	box-sizing: border-box;
	border-radius: 15px;
	outline: none;
`;

const CreateEventModalBodyStyle = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 75%;
`;


const ERROR_MESSAGE = {
	nameError: "이벤트 이름을 확인해주세요",
	dateError: "시작날짜를 다시 선택해주세요",
};

function getErrorMessage(errorState) {
	let message = "";

	if (errorState.date === true) {
		message = ERROR_MESSAGE.dateError;
	}

	if (errorState.eventName === true) {
		message = ERROR_MESSAGE.nameError;
	}

	return message;
}

function isInvalidInputData(errorState) {
	return Object.values(errorState).some(inputValue => inputValue);
}


function buildInitialEventInfo(hostName) {
	const startDate = new Date();
	const endDate = moment(startDate)
		.add(1, "h")
		.toDate();

	return {
		eventName: `${hostName}님의 이벤트`,
		startDate,
		endDate,
		hashTags: [],
		errorState: {eventName: false, date: false},
	};
}


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

// todo refactoring
function CreateEventModal({open, handleClose}) {
	const {hostInfo, addEvent} = useContext(HostContext);
	const {hostName, id: hostId} = hostInfo;

	const {snackBarOpen, snackBarHandleClose, snackBarHandleOpen} = useSnackBar();

	const initialValue = buildInitialEventInfo(hostName);
	const [eventForm, dispatch] = useReducer(
		createEventModalReducer,
		initialValue,
	);
	const [createEvent] = useCreateEvent();

	const onConfirm = async () => {
		if (isInvalidInputData(eventForm.errorState)) {
			snackBarHandleOpen();
			return;
		}

		try {
			const newEvent = await createEvent(eventForm, hostId);

			addEvent(newEvent);

			handleClose();
		} catch (e) {
			console.error(`이벤트 생성 Error ${e} ${e.stack}`);
			alert("이벤트 생성 실패");
		}
	};

	const InputEventNameProps = {
		onChange: bindOnChangeEventName(dispatch),
		error: eventForm.errorState.eventName,
		value: eventForm.eventName,
	};

	const errorMsg = getErrorMessage(eventForm.errorState);

	return (
		<Modal
			aria-labelledby="createEvent-modal-title"
			aria-describedby="createEvent-modal-description"
			open={open}
			onClose={handleClose}
		>
			<PopUpLayOutStyle>
				<CreateEventModalHeader/>
				<CreateEventModalBodyStyle>
					<InputEventName {...InputEventNameProps}/>
					<InputStartDate
						errorState={eventForm.errorState}
						startDate={eventForm.startDate}
						endDate={eventForm.endDate}
						dispatch={dispatch}
					/>
					<EndDateField endDate={eventForm.endDate}/>
					<InputHashTag
						hashTags={eventForm.hashTags}
						dispatch={dispatch}
					/>
					<HashTagsField
						hashTags={eventForm.hashTags}
						dispatch={dispatch}
					/>
				</CreateEventModalBodyStyle>
				<CreateEventModalFooter onConfirm={onConfirm} onClose={handleClose}/>
				<AlertSnackbar
					message={errorMsg}
					onClose={snackBarHandleClose}
					open={snackBarOpen}
				/>
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default CreateEventModal;
