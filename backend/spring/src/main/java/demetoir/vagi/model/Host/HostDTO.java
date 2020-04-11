package demetoir.vagi.model.Host;

import demetoir.vagi.model.Event.Event;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class HostDTO {

  private Integer id;

  private String oauthId;

  private String name;

  private String email;

  private String image;

  private Boolean emailFeedBack;

  private Timestamp createdAt;

  private Timestamp updatedAt;

  private Set<Event> events = new HashSet<>();

  public Host toEntity() {
    return Host.builder()
        .image(this.image)
        .name(this.name)
        .oauthId(this.oauthId)
        .email(this.email)
        .emailFeedBack(this.emailFeedBack)
        .id(this.id)
        .createdAt(this.createdAt)
        .updatedAt(this.updatedAt)
        .events(this.events)
        .build();
  }

  static HostDTO fromEntity(Host host) {
    return HostDTO.builder()
        .image(host.getImage())
        .name(host.getName())
        .oauthId(host.getOauthId())
        .email(host.getEmail())
        .emailFeedBack(host.getEmailFeedBack())
        .id(host.getId())
        .createdAt(host.getCreatedAt())
        .updatedAt(host.getUpdatedAt())
        .events(host.getEvents())
        .build();
  }
}
