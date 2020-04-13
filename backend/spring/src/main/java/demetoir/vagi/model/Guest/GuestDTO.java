package demetoir.vagi.model.Guest;

import demetoir.vagi.model.Event.Event;
import lombok.*;

import java.sql.Timestamp;

// lombok
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = "event")
public class GuestDTO {

  private Integer id;
  private String name;
  private Boolean isAnonymous;
  private String guestSid;
  private String company;
  private String email;
  private Timestamp createdAt;
  private Timestamp updatedAt;
  private Event event;
}
