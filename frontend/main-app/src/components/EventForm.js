import styled from "styled-components";
import React, {useState} from "react";
import axios from "axios";
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
	const onEnterEvent = async () => {
		setMessage(enterEventMessage);

		const encodedEventCode = window.btoa(code);

		// todo refactoring
		try {
			await axios({
				method: "get",
				url: `${config.guestEventCode}?encodedEventCode=${encodedEventCode}`,
			});

			setMessage("redirect to app");
			window.location.href = `${config.guestSignUpURL}/${encodedEventCode}`;
		} catch (e) {
			console.debug(e);
			setMessage(e.response.data.error);
		}
	};

	return (
		<EventFormStyle>
			<EventCodeInput
				onChange={onChange}
				onEnterKeyPress={onEnterEvent}
				value={code}
			/>
			<EventEnterButton onClick={onEnterEvent} />
			<EventCodeInputErrorMessage message={errorMessage} />
		</EventFormStyle>
	);
}

export default EventForm;
