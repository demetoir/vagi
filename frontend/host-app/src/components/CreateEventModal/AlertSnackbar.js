import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


function AlertSnackbar(props) {
	const {onClose, open, message} = props;

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			autoHideDuration={6000}
			ContentProps={{
				"aria-describedby": "can't create event",
			}}
			message={<span id="message-id">{message}</span>}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					onClick={onClose}
				>
					<CloseIcon/>
				</IconButton>,
			]}
			open={open}
			onClose={onClose}
		/>
	);
}

export default AlertSnackbar;
