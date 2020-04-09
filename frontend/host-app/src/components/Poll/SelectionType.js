import React from "react";
import styled from "styled-components";
import {Radio} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";


// todo refactoring
const RowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	min-height: 50px;
	padding: 0 0 0 1rem;
	box-sizing: border-box;
`;

function SelectionType({selectionType, onChange}) {
	return (
		<RowWrapper>
			<FormControlLabel
				value="text"
				label="텍스트"
				control={
					<Radio
						checked={selectionType === "text"}
						onChange={onChange}
					/>
				}
			/>
			<FormControlLabel
				value="date"
				label="날짜"
				control={
					<Radio
						checked={selectionType === "date"}
						onChange={onChange}
					/>
				}
			/>
		</RowWrapper>
	);
}

export default SelectionType;
