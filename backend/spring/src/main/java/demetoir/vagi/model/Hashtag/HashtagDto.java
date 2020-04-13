package demetoir.vagi.model.Hashtag;

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
public class HashtagDto {

  private Integer id;
  private String name;
  private Timestamp createdAt;
  private Timestamp updatedAt;
  private Event event;
}
