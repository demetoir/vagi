package demetoir.vagi.model.Poll;

import demetoir.vagi.model.Event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PollRepository extends JpaRepository<Poll, Integer> {

  // todo open poll 이거는 entity에서 해결

  // todo close poll 이거는 entity에서 해결

  // todo create

  // todo test
  List<Poll> findAllByEvent(Event event);
}
