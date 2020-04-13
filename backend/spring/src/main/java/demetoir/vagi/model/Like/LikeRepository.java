package demetoir.vagi.model.Like;

import demetoir.vagi.model.Guest.Guest;
import demetoir.vagi.model.Question.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Integer> {

  // todo test
  void deleteByGuestAndQuestion(Guest guest, Question question);

  // todo test
  List<Like> findAllByGuest(Guest guest);
}
