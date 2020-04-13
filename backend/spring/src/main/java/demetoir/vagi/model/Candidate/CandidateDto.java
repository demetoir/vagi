package demetoir.vagi.model.Candidate;

import demetoir.vagi.model.Poll.Poll;
import lombok.*;

import java.sql.Timestamp;

// todo
@Getter
@Setter
@ToString(exclude = {"poll"})
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
}
