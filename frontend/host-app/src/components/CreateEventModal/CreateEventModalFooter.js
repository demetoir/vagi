import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";

const ButtonFieldStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: flex-end;
	height: 3rem;
`;

function CreateEventModalFooter({onConfirm, onClose}) {
	return (
		<ButtonFieldStyle>
			<Button
				size="large"
				variant="contained"
				color="secondary"
				onClick={onClose}
			>
				취소
			</Button>
			<Button
				size="large"
				variant="contained"
				color="primary"
				onClick={onConfirm}
			>
				확인
			</Button>
		</ButtonFieldStyle>
	);
}

export default CreateEventModalFooter;
