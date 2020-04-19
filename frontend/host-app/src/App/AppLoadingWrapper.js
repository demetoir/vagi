import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {queryEventsByHost} from "../graphql/gql.js";
import AppSkeleton from "../components/Skeleton/AppSkeleton.js";
import config from "../config";
import App from "./App.js";

function AppLoadingWrapper() {
	const {data, loading, error} = useQuery(queryEventsByHost);

	if (loading) {
		return <AppSkeleton />;
	} else if (error) {
		// todo add error page ..
		// window.location.href = config.inValidGuestRedirectURL;
		return <div />;
	}

	return <App data={data} />;
}

export default AppLoadingWrapper;
