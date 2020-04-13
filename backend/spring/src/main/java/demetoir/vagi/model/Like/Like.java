package demetoir.vagi.model.Like;

import demetoir.vagi.model.Guest.Guest;
import demetoir.vagi.model.Question.Question;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

// lombok
@Getter
@Setter
@ToString(exclude = {"guest", "question"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
// auditing
@EntityListeners(value = {AuditingEntityListener.class})
// JPA
@Table(name = "Likes")
@Entity
public class Like {
  @Id
  @Column(columnDefinition = "int", name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @CreatedDate
  @Column(name = "createdAt", columnDefinition = "datetime", nullable = false)
  private Timestamp createdAt;

  @LastModifiedDate
  @Column(name = "updatedAt", columnDefinition = "datetime", nullable = false)
  private Timestamp updatedAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "GuestId")
  private Guest guest;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "QuestionId")
  private Question question;
}
