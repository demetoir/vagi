import React from "react";
import InputStartDate from "./InputStartDate/InputStartDate.js";
import EndDateField from "./EndDateField.js";

export default function DateInputsArea({eventForm, dispatch}) {
	return <>
		<InputStartDate
			errorState={eventForm.errorState}
			startDate={eventForm.startDate}
			endDate={eventForm.endDate}
			dispatch={dispatch}
		/>
		<EndDateField endDate={eventForm.endDate}/>
	</>;
}
