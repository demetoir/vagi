import React from "react";
import styled from "styled-components";
import {Radio} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const PollTypeStyle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	min-height: 60px;
	padding: 0 2rem;
	box-sizing: border-box;
	.label {
		margin-right: 1rem;
	}
`;

// todo refactoring
function PollType({pollType, onChange}) {
	return (
		<PollTypeStyle>
			<span className="label">투표 종류 :</span>
			<FormControlLabel
				value="nItems"
				label="N지선다"
				control={
					<Radio
						checked={pollType === "nItems"}
						onChange={onChange}
					/>
				}
			/>

			<FormControlLabel
				value="rating"
				label="별점"
				control={
					<Radio
						checked={pollType === "rating"}
						onChange={onChange}
					/>
				}
			/>
		</PollTypeStyle>
	);
}

export default PollType;
