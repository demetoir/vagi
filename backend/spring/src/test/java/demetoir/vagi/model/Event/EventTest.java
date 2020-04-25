package demetoir.vagi.model.Event;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
class EventTest {
  @Autowired private EventRepository eventRepository;

  @Test
  public void di() {
    assertThat(eventRepository).isNotNull();
  }

  @Test
  public void builder() {

    var startAt = Timestamp.from(Instant.now());
    var endAt = Timestamp.from(Instant.now().plus(1, ChronoUnit.HOURS));

    Event event =
        Event.builder()
            .eventCode("event code")
            .eventName("event name")
            .startAt(startAt)
            .endAt(endAt)
            .build();
  }

  @Test
  public void isParticipateAble_true() {
    var startAt = Timestamp.from(Instant.now().minus(1, ChronoUnit.HOURS));
    var endAt = Timestamp.from(Instant.now().plus(1, ChronoUnit.HOURS));

    Event event =
        Event.builder()
            .eventCode("event code")
            .eventName("event name")
            .startAt(startAt)
            .endAt(endAt)
            .build();

    assertThat(event.isParticipateAble()).isTrue();
  }

  @Test
  public void isParticipateAble_false_after_event() {
    var startAt = Timestamp.from(Instant.now().minus(2, ChronoUnit.HOURS));
    var endAt = Timestamp.from(Instant.now().minus(1, ChronoUnit.HOURS));

    Event event =
        Event.builder()
            .eventCode("event code")
            .eventName("event name")
            .startAt(startAt)
            .endAt(endAt)
            .build();

    assertThat(event.isParticipateAble()).isFalse();
  }

  @Test
  public void isParticipateAble_false_before_event() {
    var startAt = Timestamp.from(Instant.now().plus(1, ChronoUnit.HOURS));
    var endAt = Timestamp.from(Instant.now().plus(2, ChronoUnit.HOURS));

    Event event =
        Event.builder()
            .eventCode("event code")
            .eventName("event name")
            .startAt(startAt)
            .endAt(endAt)
            .build();

    assertThat(event.isParticipateAble()).isFalse();
  }
}
