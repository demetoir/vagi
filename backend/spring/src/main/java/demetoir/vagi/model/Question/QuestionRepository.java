package demetoir.vagi.model.Question;

import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Guest.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

  // todo test
  List<Question> findAllByEvent(Event event);

  // todo test find replys by eventId
//  List<Question> findAllByEvent(Event event);

  // todo test
  List<Question> findAllByGuest(Guest guest);

  // todo test
  @Override
  void deleteById(Integer integer);

  // todo updateQuestionIsStared({from, to})

  // todo
  @Override
  Optional<Question> findById(Integer integer);

  // todo updateQuestionsByStateAndEventId({from, to, EventId})
}
