package demetoir.vagi.model.Hashtag;

import demetoir.vagi.model.Event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {

  // todo test
  @Override
  Optional<Hashtag> findById(Integer integer);

  // todo test
  @Override
  void deleteById(Integer integer);

  // todo test
  List<Hashtag> findAllByEvent(Event event);

  // todo getHashtagByEventIds(EventIdList) impl and test
}
