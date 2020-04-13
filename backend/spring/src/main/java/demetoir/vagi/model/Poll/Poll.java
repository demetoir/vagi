package demetoir.vagi.model.Poll;

import demetoir.vagi.model.Event.Event;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

// todo
// lombok
@Getter
@Setter
@ToString(exclude = {"event"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
// auditing
@EntityListeners(value = {AuditingEntityListener.class})
// JPA
@Table(name = "Polls")
@Entity
public class Poll {
  @Id
  @Column(columnDefinition = "int", name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "pollName", columnDefinition = "varchar", length = 100)
  private String pollName;

  @Column(name = "pollType", columnDefinition = "varchar", length = 10)
  private String pollType;

  @Column(name = "selectionType", columnDefinition = "varchar", length = 10)
  private String selectionType;

  @Column(name = "state", columnDefinition = "varchar", length = 10)
  private String state;

  @Column(name = "allowDuplication")
  private Boolean allowDuplication;

  @Column(name = "pollDate", columnDefinition = "datetime")
  private Timestamp pollDate;

  @CreatedDate
  @Column(name = "createdAt", columnDefinition = "datetime", nullable = false)
  private Timestamp createdAt;

  @LastModifiedDate
  @Column(name = "updatedAt", columnDefinition = "datetime", nullable = false)
  private Timestamp updatedAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "EventId", columnDefinition = "int")
  private Event event;
}
