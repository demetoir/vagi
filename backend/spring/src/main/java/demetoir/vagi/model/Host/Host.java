package demetoir.vagi.model.Host;

import demetoir.vagi.model.Event.Event;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
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

  @Column(name = "createdAt")
  private Timestamp createdAt;

  @Column(name = "updatedAt")
  private Timestamp updatedAt;

  @OneToMany(mappedBy = "host", fetch = FetchType.LAZY)
  private Collection<Event> events;
}
