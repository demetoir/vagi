import styled from "styled-components";
import React, {useState} from "react";
import config from "../config";
import EventCodeInput from "../atoms/EventCodeInput.js";
import EventEnterButton from "../atoms/EnterEventButton.js";
import EventCodeInputErrorMessage from "../atoms/EventCodeInputErrorMessage.js";

const enterEventMessage = "이벤트 번호가 전달되었습니다.";
const initialErrorMessage = "";
const initialCode = "";

const EventFormStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function EventForm() {
	const [errorMessage, setMessage] = useState(initialErrorMessage);
	const [code, setCode] = useState(initialCode);
	const onChange = e => {
		setCode(e.target.value);
		setMessage(initialErrorMessage);
	};
	const onEnterEvent = () => {
		setMessage(enterEventMessage);

		const encodedEventCode = window.btoa(code);

		window.location.href = `${config.guestAppURL}/${encodedEventCode}`;
	};

	return (
		<form autoComplete="off">
			<EventFormStyle>
				<EventCodeInput onChange={onChange} value={code} />
				<EventEnterButton onClick={onEnterEvent} />
				<EventCodeInputErrorMessage message={errorMessage} />
			</EventFormStyle>
		</form>
	);
}

export default EventForm;
