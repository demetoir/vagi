package demetoir.vagi.model.Candidate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {

  // todo findByPollIds
  //    Collection<Candidate>

}
