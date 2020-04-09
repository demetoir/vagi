import {useState} from "react";

const useSnackBar = (initialState = false) => {
	const [snackBarOpen, setSnackBarOpen] = useState(initialState);
	const snackBarHandleClose = reason => {
		if (reason === "clickaway") {
			return;
		}

		setSnackBarOpen(false);
	};
	const snackBarHandleOpen = () => {
		setSnackBarOpen(true);
	};

	return {snackBarOpen, snackBarHandleClose, setSnackBarOpen, snackBarHandleOpen};
};

export default useSnackBar;
