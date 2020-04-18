import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_GUEST_APP_GLOBAL_DATA} from "../../graphql/gqlSchemes.js";
import TopProgressBar from "../../components/atoms/TopProcessBar.js";
import config from "../../config";
import GlobalDataContext from "./GlobalDataContext.js";

function GlobalDataProvider(props) {
	const {data, loading, error} = useQuery(GET_GUEST_APP_GLOBAL_DATA);

	if (loading) {
		return <TopProgressBar />;
	}

	if (error) {
		window.location.href = config.inValidGuestRedirectURL;
		return <div />;
	}

	const {event, guest} = data.guestInEvent;
	const globalData = {event, guest};

	return (
		<GlobalDataContext.Provider value={globalData}>
			{props.children}
		</GlobalDataContext.Provider>
	);
}

export default GlobalDataProvider;
