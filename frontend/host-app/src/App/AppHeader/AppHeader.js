import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import AppHeaderTitle from "./AppHeaderTitle.js";
import AppHeaderButtonArea from "./AppHeaderButtonArea.js";

const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: "#212529",
	},
	rightSide: {
		display: "flex",
		marginLeft: "auto",
	},
}));


function AppHeader() {
	const classes = useStyles(undefined);

	return (
		<AppBar position="static">
			<Toolbar variant="dense" className={classes.header}>
				<AppHeaderTitle/>
				<div className={classes.rightSide}>
					<AppHeaderButtonArea/>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default AppHeader;
