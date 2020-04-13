package demetoir.vagi.model.Guest;

import demetoir.vagi.model.Event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface GuestRepository extends JpaRepository<Guest, Integer> {
  // todo test
  Guest findByGuestSid(String guestSid);

  // todo test
  Set<Guest> findByEvent(Event event);
}
