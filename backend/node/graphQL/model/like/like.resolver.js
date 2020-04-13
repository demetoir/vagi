import {getLikesByGuestId} from "../../../DB/queries/like.js";

// todo add auth guest
const didILikesResolver = async (_, {GuestId}) => getLikesByGuestId(GuestId);

export default {
	Query: {
		didILikes: didILikesResolver,
	},
};
