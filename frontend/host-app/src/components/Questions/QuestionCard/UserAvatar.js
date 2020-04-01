import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import randomMC from "random-material-color";

function NamedAvatar({guestName}) {
	const useStyles = makeStyles({
		avatar: {
			margin: 10,
		},
		randomAvatar: {
			backgroundColor: randomMC.getColor({text: guestName}),
		},
	});
	const classes = useStyles(undefined);
	const inner = guestName.slice(0, 1);

	return <Avatar className={classes.randomAvatar}>{inner}</Avatar>;
}

function AnonymousAvatar() {
	return (
		<Avatar>
			<i className="fa-user" />
		</Avatar>
	);
}

function UserAvatar({isAnonymous, guestName}) {
	return isAnonymous ? <AnonymousAvatar /> : <NamedAvatar {...{guestName}} />;
}

export default UserAvatar;
