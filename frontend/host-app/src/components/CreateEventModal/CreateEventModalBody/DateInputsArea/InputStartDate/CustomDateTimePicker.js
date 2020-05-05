import React from "react";
import {styled} from "@material-ui/core/styles";
import {DateTimePicker} from "@material-ui/pickers";

const marginTopLength = 20;
const dateTimePickerFormat = "YYYY년 MM월 dd일 HH시 mm분";
const CustomDateTimePickerStyle = styled(DateTimePicker)({
	marginTop: marginTopLength,
	width: 250,
});

export default function CustomDateTimePicker({error, value, onChange}) {
	return <CustomDateTimePickerStyle
		label="시작날짜"
		error={error}
		value={value}
		format={dateTimePickerFormat}
		onChange={onChange}
	/>;
}
