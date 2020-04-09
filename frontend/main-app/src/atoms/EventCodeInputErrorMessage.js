import React from "react";
import styled from "styled-components";


const EventCodeInputErrorMessageStyle = styled.div`
	color: red;
	height: 2rem;
`;


export default function EventCodeInputErrorMessage({message}) {
	return <EventCodeInputErrorMessageStyle>
		{message}
	</EventCodeInputErrorMessageStyle>;
}
