package demetoir.vagi.model.Event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {

  <S extends Event> Optional<S> findOneByEventCode(String eventCode);
}
