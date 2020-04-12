package demetoir.vagi.model.Event;

import demetoir.vagi.model.Host.Host;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EventDTO {

  private Integer id;

  private String eventCode;

  private String eventName;

  private Boolean isLive;

  private Boolean moderationOption;

  private Boolean replyOption;

  private Timestamp startAt;

  private Timestamp endAt;

  private Timestamp createdAt;

  private Timestamp updatedAt;

  private Host host;

  public Event toEntity() {
    return new ModelMapper().map(this, Event.class);
  }

  public static EventDTO fromEntity(Event event) {
    return new ModelMapper().map(event, EventDTO.class);
  }
}
