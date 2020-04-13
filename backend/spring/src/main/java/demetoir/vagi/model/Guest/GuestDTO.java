package demetoir.vagi.model.Guest;

import demetoir.vagi.model.Emoji.Emoji;
import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Like.Like;
import demetoir.vagi.model.Question.Question;
import demetoir.vagi.model.Vote.Vote;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

// lombok
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = {"event", "questions", "emojis", "likes", "votes"})
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
  @Builder.Default private Set<Question> questions = new HashSet<>();

  @Builder.Default private Set<Emoji> emojis = new HashSet<>();

  @Builder.Default private Set<Like> likes = new HashSet<>();

  @Builder.Default private Set<Vote> votes = new HashSet<>();
}
