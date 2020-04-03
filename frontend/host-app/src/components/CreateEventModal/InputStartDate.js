import React, {useState} from "react";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {styled} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import moment from "moment";
import {validDate} from "../../libs/eventValidation";
import {SET_ERROR_STATE, SET_PROPERTY} from "./eventModalActions.js";
import CustomDateTimePicker from "./CustomDateTimePicker.js";
import CustomTimePicker from "./CustomTimePicker.js";

const defaultInputTime = new Date().setHours(1, 0);

const InputStartDateStyle = styled(Container)({
	display: "flex",
	margin: "1rem 0 0 0",
	padding: 0,
});


function InputStartDate(props) {
	const {startDate, dispatch, errorState} = props;
	const [lastTime, setLastTime] = useState(defaultInputTime);

	// todo do some thing
	const calcEndDate = (lastTime, startTime = startDate) => {
		const hour = moment(lastTime).format("HH");
		const minute = moment(lastTime).format("mm");
		let addedTime = moment(startTime)
			.add(hour, "h")
			.toDate();

		addedTime = moment(addedTime)
			.add(minute, "m")
			.toDate();
		dispatch({
			type: SET_PROPERTY,
			property: "endDate",
			value: moment(addedTime),
		});

		setLastTime(lastTime);
		dispatch({
			type: SET_ERROR_STATE,
			property: "date",
			value: !validDate(startTime, addedTime),
		});
	};

	const setDate = event => {
		dispatch({
			type: SET_PROPERTY,
			property: "startDate",
			value: event,
		});
		calcEndDate(lastTime, event);
	};

	return (
		<InputStartDateStyle>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<CustomDateTimePicker
					error={errorState.date}
					value={startDate}
					onChange={setDate}
				/>
				<CustomTimePicker
					value={lastTime}
					onChange={calcEndDate}
				/>
			</MuiPickersUtilsProvider>
		</InputStartDateStyle>
	);
}

export default InputStartDate;
