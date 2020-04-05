import React from "react";
import {styled} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import {Scrollbars} from "react-custom-scrollbars";
import {SET_PROPERTY} from "../../../../hooks/useCreateEventModal/createEventModalActions.js";

const MyPaper = styled(Paper)({
	marginTop: 10,
	overflowY: "auto",
	"::-webkit-scrollbar": {
		display: "none",
	},
	width: 400,
});

const CustomChip = styled(Chip)({
	margin: 5,
});

// todo refactoring here
function HashTagField(props) {
	const {hashTags, dispatch} = props;

	const bindOnDeleteHashTag = hashTagToDelete => () => {
		const isDeletedHashTag = hashTag => hashTag.key !== hashTagToDelete.key;
		const deletedHashTagList = hashTags.filter(isDeletedHashTag);

		dispatch({
			type: SET_PROPERTY,
			property: "hashTags",
			value: deletedHashTagList,
		});
	};

	return (
		<Scrollbars>
			<MyPaper>
				{hashTags.map(hashTag => (
					<CustomChip
						icon={<LocalOfferIcon/>}
						color="primary"
						variant="outlined"
						key={hashTag.key}
						label={hashTag.label}
						onDelete={bindOnDeleteHashTag(hashTag)}
					/>
				))}
			</MyPaper>
		</Scrollbars>
	);
}

export default HashTagField;
