package demetoir.vagi.model.Candidate;

import demetoir.vagi.model.Poll.Poll;
import org.springframework.data.jpa.repository.JpaRepository;

// todo need?
public interface CandidateRepository extends JpaRepository<Poll, Integer> {}
