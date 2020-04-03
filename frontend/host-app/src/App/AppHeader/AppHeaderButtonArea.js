import React from "react";
import useModal from "../../hooks/useModal.js";
import HeaderConfigAvatar from "./HeaderConfigAvatar.js";
import HeaderAccountAvatar from "./HeaderAccountAvatar.js";
import EventSettingModal from "../../components/EventSettingModal/EventSettingModal.js";


export default function AppHeaderButtonArea() {
	const [isOpen, handleOpen, handleClose] = useModal();

	return <>
		<HeaderConfigAvatar onClick={handleOpen}/>
		<HeaderAccountAvatar/>
		{isOpen && (
			<EventSettingModal
				open={isOpen}
				handleClose={handleClose}
			/>
		)}
	</>;
}
