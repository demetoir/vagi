import {useMutation} from "@apollo/react-hooks";
import {mutateCreateEvent} from "../../graphql/gql.js";

export default function useMutateEvent() {
	const [mutationEvent] = useMutation(mutateCreateEvent);
	const mutateEvent = async variables => {
		const {data: {createEvent: event}} = await mutationEvent({variables});

		return event;
	};

	return [mutateEvent];
}
