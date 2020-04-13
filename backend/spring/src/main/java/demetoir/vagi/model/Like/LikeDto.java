package demetoir.vagi.model.Like;

import demetoir.vagi.model.Guest.Guest;
import demetoir.vagi.model.Question.Question;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = {"guest", "question"})
public class LikeDto {

  private Integer id;

  private Timestamp createdAt;

  private Timestamp updatedAt;

  private Guest guest;

  private Question question;
}
