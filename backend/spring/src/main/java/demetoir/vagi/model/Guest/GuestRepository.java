package demetoir.vagi.model.Guest;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Integer> {
  Guest findByGuestSid(String guestSid);
}
