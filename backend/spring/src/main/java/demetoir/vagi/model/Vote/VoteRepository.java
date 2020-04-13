package demetoir.vagi.model.Vote;

import demetoir.vagi.model.Candidate.Candidate;
import demetoir.vagi.model.Guest.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Integer> {

  // todo
  void deleteByGuestAndCandidate(Guest guest, Candidate candidate);

  // todo swapVoteByGuestId( GuestId, newCandidateId, oldCandidateId, )


    // todo getCandidatesByGuestId(candidateList, guestId)

    // todo getVotersByCandidateIds(candidateIds)
}
