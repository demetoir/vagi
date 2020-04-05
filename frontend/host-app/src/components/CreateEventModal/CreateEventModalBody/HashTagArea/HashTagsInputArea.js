import React from "react";
import InputHashTag from "./InputHashTag.js";
import HashTagsField from "./HashTagsField.js";

export default function HashTagsInputArea({hashTags, dispatch}) {
	return <>
		<InputHashTag
			hashTags={hashTags}
			dispatch={dispatch}
		/>
		<HashTagsField
			hashTags={hashTags}
			dispatch={dispatch}
		/>
	</>;
}
