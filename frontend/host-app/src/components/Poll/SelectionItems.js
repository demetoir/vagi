import React from "react";
import styled from "styled-components";
import Item from "./Item";

const SelectionItemStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	padding: 0.5rem;
	width: 100%;
`;

// todo refactoring
function SelectionItem(props) {
	const {nItems, totalVoters, ...others} = props;

	return (
		<SelectionItemStyle>
			{nItems.map((item, index) => (
				<Item
					{...item}
					totalVoters={totalVoters}
					key={index}
					{...others}
				/>
			))}
		</SelectionItemStyle>
	);
}

export default SelectionItem;
