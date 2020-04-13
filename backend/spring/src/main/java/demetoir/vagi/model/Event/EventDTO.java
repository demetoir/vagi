package demetoir.vagi.model.Event;

import demetoir.vagi.model.Emoji.Emoji;
import demetoir.vagi.model.Guest.Guest;
import demetoir.vagi.model.Hashtag.Hashtag;
import demetoir.vagi.model.Host.Host;
import demetoir.vagi.model.Poll.Poll;
import demetoir.vagi.model.Question.Question;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

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

  @Builder.Default private Set<Guest> guests = new HashSet<>();

  @Builder.Default private Set<Question> questions = new HashSet<>();

  @Builder.Default private Set<Hashtag> hashtags = new HashSet<>();

  @Builder.Default private Set<Emoji> emojis = new HashSet<>();

  @Builder.Default private Set<Poll> polls = new HashSet<>();
}
