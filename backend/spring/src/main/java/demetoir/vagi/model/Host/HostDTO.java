package demetoir.vagi.model.Host;

import demetoir.vagi.model.Event.Event;
import lombok.*;
import org.modelmapper.ModelMapper;

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

  @Builder.Default
  private Set<Event> events = new HashSet<>();

  public Host toEntity() {
    return new ModelMapper().map(this, Host.class);
  }

  static HostDTO fromEntity(Host host) {
    return new ModelMapper().map(host, HostDTO.class);
  }
}
