package demetoir.vagi.model.Poll;

import demetoir.vagi.model.Event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// todo
public interface PollRepository extends JpaRepository<Poll, Integer> {

  // todo open poll

  // todo close poll

  // todo create

  // todo test
  List<Poll> findAllByEvent(Event event);
}
