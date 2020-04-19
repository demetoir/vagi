import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import URLS from "../URLS.js";

export default function GuestMenuItem({onClick}) {
	const guestURL = `${URLS.guestApp}/`;

	return (
		<MenuItem onClick={onClick}>
			<a href={guestURL}>Go To Guest</a>
		</MenuItem>
	);
}
