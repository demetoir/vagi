package demetoir.vagi.model.Vote;

import demetoir.vagi.model.Candidate.Candidate;
import demetoir.vagi.model.Guest.Guest;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class VoteDto {

  private Integer id;

  private Timestamp createdAt;

  private Timestamp updatedAt;

  private Guest guest;

  private Candidate candidate;
}
