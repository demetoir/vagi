package demetoir.vagi.model.Question;

import demetoir.vagi.model.Emoji.Emoji;
import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Guest.Guest;
import demetoir.vagi.model.Like.Like;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

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

  @Builder.Default private Set<Emoji> emojis = new HashSet<>();
  @Builder.Default private Set<Like> likes = new HashSet<>();
}
