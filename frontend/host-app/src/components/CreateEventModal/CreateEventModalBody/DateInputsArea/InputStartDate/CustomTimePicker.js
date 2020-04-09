import React from "react";
import {styled} from "@material-ui/core/styles";
import {TimePicker} from "@material-ui/pickers";

const timePickerFormat = "HH시간 mm분";
const marginTopLength = 20;
const CustomTimePickerStyle = styled(TimePicker)({
	marginTop: marginTopLength,
	marginLeft: 30,
	width: 120,
});

export default function CustomTimePicker({value, onChange}) {
	return <CustomTimePickerStyle
		clearable
		ampm={false}
		label="유효시간"
		minutesStep={5}
		format={timePickerFormat}
		value={value}
		onChange={onChange}
	/>;
}
