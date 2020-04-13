import HostQuery from "./querys/HostQuery.js";
import models from "../models";
import EventQuery from "./querys/EventQuery.js";
import GuestQuery from "./querys/GuestQuery.js";
import QuestionQuery from "./querys/QuestionQuery.js";
import EmojiQuery from "./querys/EmojiQuery.js";
import LikeQuery from "./querys/LikeQuery.js";

export const hostQuery = new HostQuery(models);
export const eventQuery = new EventQuery(models);
export const guestQuery = new GuestQuery(models);
export const questionQuery = new QuestionQuery(models);
export const emojiQuery = new EmojiQuery(models);

export const likeQuery = new LikeQuery(models);


// todo hashtag
// todo poll
// todo candidate
// todo vote


// export const hashtagQuery = new HashtagQuery(models);
// export const pollQuery = new PollQuery(models);
// export const voteQuery = new VoteQuery(models);
// export const candidateQuery = new CandidateQuery(models);
