import {useMutation} from "@apollo/react-hooks";
import {mutateCreateHashTags} from "../../graphql/gql.js";

export default function useMutateHashtags() {
	const [mutationHashTags] = useMutation(mutateCreateHashTags);
	const mutateHashTags = async variables => {
		const {data: {createHashTags: HashTags}} = await mutationHashTags({variables});

		return HashTags;
	};

	return [mutateHashTags];
}
