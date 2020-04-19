package demetoir.vagi.model.Emoji;

import demetoir.vagi.model.Event.Event;
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
@ToString(exclude = {"guest", "event", "question"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
// auditing
@EntityListeners(value = {AuditingEntityListener.class})
// JPA
@Table(name = "Emojis")
@Entity
public class Emoji {
  @Id
  @Column(columnDefinition = "int", name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "name", columnDefinition = "varchar", length = 100)
  private String name;

  @CreatedDate
  @Column(name = "createdAt", columnDefinition = "datetime", nullable = false)
  private Timestamp createdAt;

  @LastModifiedDate
  @Column(name = "updatedAt", columnDefinition = "datetime", nullable = false)
  private Timestamp updatedAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "GuestId", columnDefinition = "int")
  private Guest guest;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "EventId", columnDefinition = "int")
  private Event event;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "QuestionId", columnDefinition = "int")
  private Question question;
}
