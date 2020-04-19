package demetoir.vagi.model.Emoji;

import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Guest.Guest;
import demetoir.vagi.model.Question.Question;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EmojiDto {

  private Integer id;

  private String name;

  private Timestamp createdAt;

  private Timestamp updatedAt;

  private Guest guest;

  private Event event;

  private Question question;
}
