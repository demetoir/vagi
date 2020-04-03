import React, {useState} from "react";
import Cookie from "js-cookie";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {GUEST_COOKIE_KEY, HOST_COOKIE_KEY} from "../constants/CookieKeys.js";
import config from "../config";
import RecentListButton from "../atoms/RecentListButton.js";


export default function RecentEventList() {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const hostCookie = Cookie.get(HOST_COOKIE_KEY);
	const guestCookie = Cookie.get(GUEST_COOKIE_KEY);
	const empty = !hostCookie && !guestCookie;

	const hostURL = `${config.hostAppURL}/`;
	const guestURL = `${config.guestAppURL}/`;

	return (
		<>
			<RecentListButton onClick={handleClick}/>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{hostCookie && (
					<MenuItem onClick={handleClose}>
						<a href={hostURL}>Go To Host</a>
					</MenuItem>
				)}
				{guestCookie && (
					<MenuItem onClick={handleClose}>
						<a href={guestURL}>Go To Guest</a>
					</MenuItem>
				)}
				{empty && (
					<MenuItem onClick={handleClose}>
						최근 기록이 없습니다
					</MenuItem>
				)}
			</Menu>
		</>
	);
}
