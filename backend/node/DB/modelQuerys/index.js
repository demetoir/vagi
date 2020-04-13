import HostQuery from "./querys/HostQuery.js";
import models from "../models";
import EventQuery from "./querys/EventQuery.js";
import GuestQuery from "./querys/GuestQuery.js";
import QuestionQuery from "./querys/QuestionQuery.js";

export const hostQuery = new HostQuery(models);
export const eventQuery = new EventQuery(models);
export const guestQuery = new GuestQuery(models);
export const questionQuery = new QuestionQuery(models);

// todo candidate
// todo question
// todo emoji
// todo hashtag
// todo like
// todo poll
// todo vote

// export const candidateQuery = new CandidateQuery(models);
// export const emojiQuery = new EmojiQuery(models);
// export const hashtagQuery = new HashtagQuery(models);
// export const likeQuery = new LikeQuery(models);
// export const pollQuery = new PollQuery(models);
// export const voteQuery = new VoteQuery(models);
