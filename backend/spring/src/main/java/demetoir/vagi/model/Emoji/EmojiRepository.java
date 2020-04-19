package demetoir.vagi.model.Emoji;

import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Guest.Guest;
import demetoir.vagi.model.Question.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface EmojiRepository extends JpaRepository<Emoji, Integer> {

  //    @Override
  //    void deleteById(Integer id);

  // todo deleteEmojiBy({name, GuestId, QuestionId})
  void deleteByNameAndGuestAndQuestion(String name, Guest guest, Question question);

  // todo  getDidIPicked getDidIPicked({name, QuestionId, GuestId})

  // todo getEmojiCountBy({name, QuestionId})

  // todo getEmojiCountByEventIdGroupByQuestionId({EventId})

  // todo getEmojiPick({GuestId, EventId})
  Set<Emoji> findByGuestAndEvent(Guest guest, Event event);
}
