package demetoir.vagi.model.Question;

import demetoir.vagi.model.Emoji.Emoji;
import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Guest.Guest;
import demetoir.vagi.model.Like.Like;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

// lombok
@Getter
@Setter
@ToString(exclude = {"event", "guest", "replyParent"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
// auditing
@EntityListeners(value = {AuditingEntityListener.class})
// JPA
@Table(name = "Questions")
@Entity
public class Question {
  @Id
  @Column(columnDefinition = "int", name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "content", columnDefinition = "varchar", length = 500, nullable = false)
  private String content;

  @Column(name = "state", columnDefinition = "varchar", length = 20)
  private String state;

  @Column(name = "isStared")
  private Boolean isStared;

  @Column(name = "likeCount", columnDefinition = "int default 0", nullable = false)
  private Integer likeCount;

  @CreatedDate
  @Column(name = "createdAt", columnDefinition = "datetime", nullable = false)
  private Timestamp createdAt;

  @LastModifiedDate
  @Column(name = "updatedAt", columnDefinition = "datetime", nullable = false)
  private Timestamp updatedAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "EventId")
  private Event event;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "GuestId")
  private Guest guest;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "QuestionId")
  private Question replyParent;

  @Builder.Default
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "question")
  private Set<Emoji> emojis = new HashSet<>();

  @Builder.Default
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "question")
  private Set<Like> likes = new HashSet<>();
}
