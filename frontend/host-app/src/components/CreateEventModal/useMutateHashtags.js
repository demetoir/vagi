import {useMutation} from "@apollo/react-hooks";
import {mutateCreateHashTags} from "../../libs/gql.js";

export default function useMutateHashtags() {
	const [mutationHashTags] = useMutation(mutateCreateHashTags);
	const mutateHashTags = async variables => {
		const {data: {createHashTags: HashTags}} = await mutationHashTags({variables});

		return HashTags;
	};

	return [mutateHashTags];
}
