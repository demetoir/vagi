import React from "react";
import styled from "styled-components";

const Header = styled.div`
	margin: 1rem 0 0.5rem 0;
	font-size: 2rem;
	color: #139ffb;
	text-align: center;
`;

export default function CreateEventModalHeader() {
	return <Header id="createEvent-modal-title">이벤트만들기</Header>;
}
