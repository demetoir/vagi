package demetoir.vagi.model.Event;

import demetoir.vagi.model.Host.Host;
import lombok.*;

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
    return Event.builder()
        .id(this.id)
        .eventCode(this.eventCode)
        .eventName(this.eventName)
        .isLive(this.isLive)
        .moderationOption(this.moderationOption)
        .replyOption(this.replyOption)
        .createdAt(this.createdAt)
        .endAt(this.endAt)
        .startAt(this.startAt)
        .updatedAt(this.updatedAt)
        .build();
  }

  public static EventDTO fromEntity(Event event) {

    return EventDTO.builder()
        .id(event.getId())
        .eventCode(event.getEventCode())
        .eventName(event.getEventName())
        .isLive(event.getIsLive())
        .moderationOption(event.getModerationOption())
        .replyOption(event.getReplyOption())
        .createdAt(event.getCreatedAt())
        .endAt(event.getEndAt())
        .startAt(event.getStartAt())
        .updatedAt(event.getUpdatedAt())
        .build();
  }
}
