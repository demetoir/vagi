package demetoir.vagi.model.Candidate;

import org.springframework.data.jpa.repository.JpaRepository;

// todo need?
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {

  // todo findByPollIds
  //    Collection<Candidate>

}
