package demetoir.vagi.model.Guest;

import demetoir.vagi.model.Emoji.Emoji;
import demetoir.vagi.model.Event.Event;
import demetoir.vagi.model.Like.Like;
import demetoir.vagi.model.Question.Question;
import demetoir.vagi.model.Vote.Vote;
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
@ToString(exclude = {"event", "questions"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
// auditing
@EntityListeners(value = {AuditingEntityListener.class})
// JPA
@Table(name = "Guests")
@Entity
public class Guest {

  @Id
  @Column(name = "id", columnDefinition = "int")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "name", columnDefinition = "varchar", length = 100)
  private String name;

  @Column(name = "isAnonymous")
  private Boolean isAnonymous;

  @Column(name = "guestSid", columnDefinition = "varchar", length = 100)
  private String guestSid;

  @Column(name = "company", columnDefinition = "varchar", length = 100)
  private String company;

  @Column(name = "email", columnDefinition = "varchar", length = 100)
  private String email;

  @CreatedDate
  @Column(name = "createdAt", columnDefinition = "datetime", nullable = false)
  private Timestamp createdAt;

  @LastModifiedDate
  @Column(name = "updatedAt", columnDefinition = "datetime", nullable = false)
  private Timestamp updatedAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "EventId")
  private Event event;

  @Builder.Default
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "guest")
  private Set<Question> questions = new HashSet<>();

  @Builder.Default
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "guest")
  private Set<Emoji> emojis = new HashSet<>();

  @Builder.Default
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "guest")
  private Set<Like> likes = new HashSet<>();

  @Builder.Default
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "guest")
  private Set<Vote> votes = new HashSet<>();
}
