package demetoir.vagi.model.Guest;

import demetoir.vagi.config.JpaAuditingConfig;
import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Event.EventRepository;
import lombok.extern.java.Log;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@Log
@RunWith(SpringRunner.class)
@Import(JpaAuditingConfig.class)
@DataJpaTest
class GuestRepositoryTest {

  @Autowired EventRepository eventRepository;
  @Autowired GuestRepository guestRepository;
  @Autowired JpaAuditingConfig jpaAuditingConfig;

  @DisplayName("test에 필요한 bean DI")
  @Test
  void di() {
    assertThat(eventRepository).isNotNull();
    assertThat(guestRepository).isNotNull();
    assertThat(jpaAuditingConfig).isNotNull();
  }

  @Test
  void findOneByGuestSid_return_entity() {
    String guestSid = "guest sid";
    var newGuest = Guest.builder().guestSid(guestSid).build();

    var existGuest = guestRepository.save(newGuest);

    var guestOptional = guestRepository.findOneByGuestSid(guestSid);
    assertThat(guestOptional.isPresent()).isTrue();

    var guest = guestOptional.get();
    assertThat(guest).isEqualTo(existGuest);
  }

  @Test
  void findOneByGuestSid_return_null_on_not_exist() {
    String guestSid = "guest sid";

    var guestOptional = guestRepository.findOneByGuestSid(guestSid);
    assertThat(guestOptional.isPresent()).isFalse();
  }

  @Test
  void findAllByEvent() {
    var eventName = "eventName";
    var endAt = new Timestamp(new Date().getTime());
    var startAt = new Timestamp(new Date().getTime());
    var eventCode = "eventCode";

    var newEvent =
        Event.builder()
            .eventName(eventName)
            .eventCode(eventCode)
            .startAt(startAt)
            .endAt(endAt)
            .build();

    String guestSid = "guest sid";
    var newGuest = Guest.builder().guestSid(guestSid).build();

    newGuest.setEvent(newEvent);
    newEvent.getGuests().add(newGuest);

    var existGuest = guestRepository.save(newGuest);
    var existEvent = eventRepository.save(newEvent);

    var resultGuests = guestRepository.findAllByEvent(existEvent);

    assertThat(resultGuests.size()).isEqualTo(1);
    assertThat(resultGuests.get(0)).isEqualTo(existGuest);
  }
}
