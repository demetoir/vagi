import {getVotersByCandidateIds} from "../../../DB/queries/vote.js";

const getCandidateIds = items => items.map(n => n.id);

const updateVoters = async poll => {
	// todo fix this
	// DB에서 갱신된 투표인수를 읽어옴
	for (const candidate of poll.nItems) {
		candidate.voters = await getVotersByCandidateIds([candidate.id]);
	}
	const candidateIds = getCandidateIds(poll.nItems);

	poll.totalVoters = await getVotersByCandidateIds(candidateIds);
};

export default updateVoters;
