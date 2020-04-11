package demetoir.vagi.model.Host;

import demetoir.vagi.model.Event.Event;
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
@ToString(exclude = "events")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
// auditing
@EntityListeners(value = {AuditingEntityListener.class})
// JPA
@Entity
@Table(name = "Hosts")
public class Host {

  @Id
  @Column(name = "id", columnDefinition = "int")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name = "oauthId", length = 100, columnDefinition = "varchar")
  private String oauthId;

  @Column(name = "name", length = 100, columnDefinition = "varchar")
  private String name;

  @Column(name = "email", length = 100, columnDefinition = "varchar")
  private String email;

  @Column(name = "image", length = 100, columnDefinition = "TEXT")
  private String image;

  @Column(name = "emailFeedBack")
  private Boolean emailFeedBack;

  @CreatedDate
  @Column(name = "createdAt", nullable = false)
  private Timestamp createdAt;

  @LastModifiedDate
  @Column(name = "updatedAt", nullable = false)
  private Timestamp updatedAt;

  @OneToMany(mappedBy = "host", fetch = FetchType.LAZY)
  private Set<Event> events = new HashSet<>();
}
