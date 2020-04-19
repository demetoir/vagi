import {ApolloClient} from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";

export default function createApolloClient(uri, token) {
	const httpLink = createHttpLink({uri});

	const authLink = setContext((_, context) => {
		const headers = {
			...context.headers,
			authorization: `Bearer ${token}`,
		};

		return {headers};
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
}
