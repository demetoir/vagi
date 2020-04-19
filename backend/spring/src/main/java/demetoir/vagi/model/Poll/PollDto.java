package demetoir.vagi.model.Poll;

import demetoir.vagi.model.Candidate.Candidate;
import demetoir.vagi.model.Event.Event;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = {"event"})
public class PollDto {

  private Integer id;

  private String pollName;

  private String pollType;

  private String selectionType;

  private String state;

  private Boolean allowDuplication;

  private Timestamp pollDate;

  private Timestamp createdAt;

  private Timestamp updatedAt;

  private Event event;

  @Builder.Default private Set<Candidate> candidates = new HashSet<>();
}
