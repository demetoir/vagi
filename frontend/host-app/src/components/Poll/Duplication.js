import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";

const DuplicationStyle = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	min-height: 60px;
	padding: 0 2rem;
	box-sizing: border-box;
`;

function Duplication({checked, onChange}) {
	return (
		<DuplicationStyle>
			<Checkbox
				checked={checked}
				onChange={onChange}
			/>
            복수선택
		</DuplicationStyle>
	);
}

export default Duplication;
