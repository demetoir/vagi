import styled from "styled-components";
import axios from "axios";
import React, {useState} from "react";
import URLS from "../URLS.js";
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
			const res = await axios({
				method: "get",
				url: `${URLS.getEvent}?encodedEventCode=${encodedEventCode}`,
			});

			console.debug(res);
			setMessage("redirect to app");
			window.location.href = `${URLS.guestSignUp}/${encodedEventCode}`;
		} catch (e) {
			console.debug(e);
			setMessage("some thing wrong");
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
