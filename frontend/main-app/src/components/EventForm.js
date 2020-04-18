import styled from "styled-components";
import axios from "axios";
import React, {useRef, useState} from "react";
import URLS from "../URLS.js";
import EventCodeInput from "../atoms/EventCodeInput.js";
import EventEnterButton from "../atoms/EnterEventButton.js";
import EventCodeInputErrorMessage from "../atoms/EventCodeInputErrorMessage.js";

const enterEventMessage = "이벤트 번호가 전달되었습니다.";
const initialErrorMessage = "";

const EventFormStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function EventForm() {
	const [errorMessage, setMessage] = useState(initialErrorMessage);
	const inputRef = useRef(null);

	const onChange = () => {
		setMessage(initialErrorMessage);
	};

	const onEnterEvent = async () => {
		const eventCode = inputRef.current.value;
		const encodedEventCode = window.btoa(eventCode);

		setMessage(enterEventMessage);

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

			if (e.response && e.response.data) {
				console.log(e.response.data);
			}

			setMessage("some thing wrong");
		}
	};

	return (
		<EventFormStyle>
			<EventCodeInput
				onChange={onChange}
				onEnterKeyPress={onEnterEvent}
				inputRef={inputRef}
			/>
			<EventEnterButton onClick={onEnterEvent} />
			<EventCodeInputErrorMessage message={errorMessage} />
		</EventFormStyle>
	);
}

export default EventForm;
