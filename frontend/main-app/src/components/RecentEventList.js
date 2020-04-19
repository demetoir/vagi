import React, {useState} from "react";
import Cookie from "js-cookie";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {GUEST_COOKIE_KEY, HOST_COOKIE_KEY} from "../constants/CookieKeys.js";
import RecentListButton from "../atoms/RecentListButton.js";
import GuestMenuItem from "../atoms/GuestMenuItem.js";
import EmptyMenuItem from "../atoms/EmptyMenuItem.js";
import URLS from "../URLS.js";

export default function RecentEventList() {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const hasHostCookie = Cookie.get(HOST_COOKIE_KEY);
	const hasGuestCookie = Cookie.get(GUEST_COOKIE_KEY);
	const isEmpty = !hasHostCookie && !hasGuestCookie;

	const hostURL = URLS.hostApp;

	return (
		<>
			<RecentListButton onClick={handleClick}/>
			<Menu
				keepMounted
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{hasHostCookie && (
					<MenuItem onClick={handleClose} ref={null}>
						<a href={hostURL}>Go To Host</a>
					</MenuItem>
				)}
				{hasGuestCookie && <GuestMenuItem onClick={handleClose}/>}
				{isEmpty && <EmptyMenuItem onClick={handleClose}/>}
			</Menu>
		</>
	);
}
