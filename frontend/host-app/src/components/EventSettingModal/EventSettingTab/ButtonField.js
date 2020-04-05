import React from "react";
import styled from "styled-components";
import useModal from "../../../hooks/useModal";
import ConfirmModal from "./ConfirmModal";

const ButtonFieldStyle = styled.div`
	margin-top: auto;
	display: flex;
	margin-left: 10rem;
`;

const CancelTextButton = styled.div`
	font-size: 1.25rem;
	color: black;
	:hover {
		font-weight: bold;
	}
	width: auto;
	cursor: pointer;
	margin: 1rem;
`;

const CreateTextButton = styled.div`
	font-size: 1.25rem;
	color: green;
	:hover {
		font-weight: bold;
	}
	width: auto;
	cursor: pointer;
	margin: 1rem;
`;

function ButtonField({submit, onClose}) {
	const [confirmModalOpen, handleOpen, handleClose] = useModal();

	return (
		<ButtonFieldStyle>
			<CancelTextButton onClick={handleOpen}>취소</CancelTextButton>
			<CreateTextButton onClick={submit}>확인</CreateTextButton>
			{confirmModalOpen && (
				<ConfirmModal
					open={confirmModalOpen}
					handleClose={handleClose}
					reset={onClose}
				/>
			)}
		</ButtonFieldStyle>
	);
}

export default ButtonField;
