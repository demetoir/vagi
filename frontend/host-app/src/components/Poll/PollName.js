import React from "react";
import styled from "styled-components";
import {TextField} from "@material-ui/core";

const PollNameStyle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	min-height: 3rem;
	padding: 0 2rem;
	box-sizing: border-box;
`;

const TitleSpan = styled.span`
	margin-right: 0.5rem;
`;

// todo refactoring
function PollName({value, onChange, error, helperText}) {
	return (
		<PollNameStyle>
			<TitleSpan>투표 제목 :</TitleSpan>
			<TextField
				autoFocus
				margin="dense"
				variant="outlined"
				placeholder="투표 제목을 입력해주세요"
				error={error}
				helperText={helperText}
				value={value}
				onChange={onChange}
			/>
		</PollNameStyle>
	);
}

export default PollName;
