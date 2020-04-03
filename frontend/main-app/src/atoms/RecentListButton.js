import React from "react";
import {Button} from "@material-ui/core";

export default function RecentListButton({onClick}) {
	return <Button onClick={onClick}>
		<h3>최근목록</h3>
	</Button>;
}
