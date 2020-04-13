package demetoir.vagi.model.Question;

import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Guest.Guest;
import lombok.*;

import java.sql.Timestamp;

// todo

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class QuestionDto {

  private Integer id;

  private String content;

  private String state;

  private Boolean isStared;

  private Integer likeCount;

  private Timestamp createdAt;

  private Timestamp updatedAt;

  private Event event;

  private Guest guest;

  private Question replyParent;
}
