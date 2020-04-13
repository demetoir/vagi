package demetoir.vagi.model.Guest;

import demetoir.vagi.model.Event.Event;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

// lombok
@Getter
@Setter
@ToString(exclude = "event")
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
}
