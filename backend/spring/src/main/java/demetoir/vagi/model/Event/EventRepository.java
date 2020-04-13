package demetoir.vagi.model.Event;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
    // todo test
    Event findByEventCode(String EventCode);
}
