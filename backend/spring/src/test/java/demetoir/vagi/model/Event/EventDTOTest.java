package demetoir.vagi.model.Event;

import org.junit.jupiter.api.Test;

import java.sql.Timestamp;
import java.util.Date;

import static org.assertj.core.api.Java6Assertions.assertThat;

class EventDTOTest {
  @Test
  void builder() {
    var eventName = "eventName";
    var endAt = new Timestamp(new Date().getTime());
    var startAt = new Timestamp(new Date().getTime());
    var eventCode = "eventCode";

    var eventDto =
        EventDTO.builder()
            .eventName(eventName)
            .eventCode(eventCode)
            .startAt(startAt)
            .endAt(endAt)
            .build();

    assertThat(eventDto).isNotNull();
    assertThat(eventDto.getEventName()).isEqualTo(eventName);
    assertThat(eventDto.getEventCode()).isEqualTo(eventCode);
    assertThat(eventDto.getStartAt()).isEqualTo(startAt);
    assertThat(eventDto.getEndAt()).isEqualTo(endAt);
  }

  @Test
  void toEntity() {
    var eventName = "eventName";
    var endAt = new Timestamp(new Date().getTime());
    var startAt = new Timestamp(new Date().getTime());
    var eventCode = "eventCode";

    var eventDto =
        EventDTO.builder()
            .eventName(eventName)
            .eventCode(eventCode)
            .startAt(startAt)
            .endAt(endAt)
            .build();

    var event = eventDto.toEntity();
    assertThat(event).isNotNull();
    assertThat(event.getEventName()).isEqualTo(eventName);
    assertThat(event.getEventCode()).isEqualTo(eventCode);
    assertThat(event.getStartAt()).isEqualTo(startAt);
    assertThat(event.getEndAt()).isEqualTo(endAt);
  }

  @Test
  void fromEntity() {
    var eventName = "eventName";
    var endAt = new Timestamp(new Date().getTime());
    var startAt = new Timestamp(new Date().getTime());
    var eventCode = "eventCode";

    var oldEventDto =
        EventDTO.builder()
            .eventName(eventName)
            .eventCode(eventCode)
            .startAt(startAt)
            .endAt(endAt)
            .build();

    var event = oldEventDto.toEntity();
    assertThat(event).isNotNull();
    assertThat(event.getEventName()).isEqualTo(eventName);
    assertThat(event.getEventCode()).isEqualTo(eventCode);
    assertThat(event.getStartAt()).isEqualTo(startAt);
    assertThat(event.getEndAt()).isEqualTo(endAt);

    var eventDto = EventDTO.fromEntity(event);
    assertThat(eventDto).isEqualTo(oldEventDto);
  }
}
