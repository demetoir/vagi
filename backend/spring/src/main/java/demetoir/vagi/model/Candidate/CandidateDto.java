package demetoir.vagi.model.Candidate;

import demetoir.vagi.model.Poll.Poll;
import demetoir.vagi.model.Vote.Vote;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString(exclude = {"poll", "votes"})
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class CandidateDto {

  private Integer id;

  private String content;

  private Integer number;

  private Timestamp createdAt;

  private Timestamp updatedAt;

  private Poll poll;

  @Builder.Default private Set<Vote> votes = new HashSet<>();
}
