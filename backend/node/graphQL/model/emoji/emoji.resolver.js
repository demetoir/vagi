import {
	getEmojiCountByEventIdGroupByQuestionId,
	getEmojiPick,
} from "../../../DB/queries/emoji.js";


// todo add verify auth guest, host
const emojisResolver = async (_, {EventId}) => {
	const res = await getEmojiCountByEventIdGroupByQuestionId({EventId});

	// todo convert type of createdAt from date to ISOString
	return res.map(x => ({...x, createdAt: x.createdAt.toISOString()}));
};

// todo add verify auth guest, host
const emojiPickResolver = async (_, {EventId, GuestId}) =>
	getEmojiPick({EventId, GuestId});

export default {
	Query: {
		emojis: emojisResolver,
		emojiPicks: emojiPickResolver,
	},
};
