import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import React from "react";
import URLS from "../URLS.js";

const GoogleOauthLoginButtonStyle = withStyles({
	root: {
		width: "150px",
		height: "34px",
		backgroundImage: "url(google.png)",
		backgroundSize: "cover",
	},
})(Button);

export default function GoogleOAuthLoginButton() {
	return (
		<GoogleOauthLoginButtonStyle href={URLS.authLogin}>
			<div/>
		</GoogleOauthLoginButtonStyle>
	);
}
