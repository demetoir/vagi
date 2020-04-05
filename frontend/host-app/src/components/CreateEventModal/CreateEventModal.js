import React, {useContext} from "react";
import {Modal} from "@material-ui/core";
import styled from "styled-components";
import CreateEventModalFooter from "./CreateEventModalFooter.js";
import CreateEventModalSnackBar from "./CreateEventModalSnackBar.js";
import {HostContext} from "../../libs/hostContext";
import useSnackBar from "../../hooks/useSnackBar";
import CreateEventModalHeader from "./CreateEventModalHeader.js";
import useCreateEvent from "../../hooks/useCreateEventModal/useCreateEvent.js";
import CreateEventModalBody from "./CreateEventModalBody/CreateEventModalBody.js";
import useCreateEventModalReducer from "../../hooks/useCreateEventModal/useCreateEventModalReducer.js";

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

function CreateEventModal({open, handleClose, addEvent, hostId, hostName}) {
	const {snackBarOpen, snackBarHandleClose, snackBarHandleOpen} = useSnackBar();
	const [eventForm, dispatch] = useCreateEventModalReducer(hostName);
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
				<CreateEventModalBody eventForm={eventForm} dispatch={dispatch}/>
				<CreateEventModalFooter onConfirm={onConfirm} onClose={handleClose}/>
				<CreateEventModalSnackBar
					message={errorMsg}
					onClose={snackBarHandleClose}
					open={snackBarOpen}
				/>
			</PopUpLayOutStyle>
		</Modal>
	);
}

function CreateEventModalWrapper(props) {
	const {hostInfo, addEvent} = useContext(HostContext);
	const {name, id: hostId} = hostInfo;
	const injectProps = {hostId, addEvent, hostName: name};

	return <CreateEventModal {...props} {...injectProps}/>;
}

export default CreateEventModalWrapper;
