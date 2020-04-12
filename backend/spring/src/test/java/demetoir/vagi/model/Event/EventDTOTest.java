package demetoir.vagi.model.Event;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.sql.Timestamp;
import java.util.Date;

import static org.assertj.core.api.Java6Assertions.assertThat;

class EventDTOTest {

  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

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
  void ConvertToEntityAndFromEntity() {
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

    var event = modelMapper.map(oldEventDto, Event.class);

    assertThat(event).isEqualToComparingFieldByField(oldEventDto);

    var eventDto = modelMapper.map(event, EventDTO.class);

    assertThat(eventDto).isEqualToComparingFieldByField(event);
  }
}
