package demetoir.vagi.model.Event;

import demetoir.vagi.model.Host.Host;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

// lombok
@Getter
@Setter
@ToString(exclude = "host")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
// auditing
@EntityListeners(value = {AuditingEntityListener.class})
// JPA
@Table(name = "Events")
@Entity
public class Event {

  @Id
  @Column(columnDefinition = "int", name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "eventCode", columnDefinition = "varchar", length = 10)
  private String eventCode;

  @Column(name = "eventName", columnDefinition = "varchar", length = 100)
  private String eventName;

  @Column(name = "isLive")
  private Boolean isLive;

  @Column(name = "moderationOption")
  private Boolean moderationOption;

  @Column(name = "replyOption")
  private Boolean replyOption;

  @Column(name = "startAt", columnDefinition = "datetime", nullable = false)
  private Timestamp startAt;

  @Column(name = "endAt", columnDefinition = "datetime", nullable = false)
  private Timestamp endAt;

  @CreatedDate
  @Column(name = "createdAt", columnDefinition = "datetime", nullable = false)
  private Timestamp createdAt;

  @LastModifiedDate
  @Column(name = "updatedAt", columnDefinition = "datetime", nullable = false)
  private Timestamp updatedAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "HostId")
  private Host host;
}