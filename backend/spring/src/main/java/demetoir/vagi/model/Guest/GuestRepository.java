package demetoir.vagi.model.Guest;

import demetoir.vagi.model.Event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GuestRepository extends JpaRepository<Guest, Integer> {

  <S extends Guest> Optional<S> findOneByGuestSid(String guestSid);

  List<Guest> findAllByEvent(Event event);
}
