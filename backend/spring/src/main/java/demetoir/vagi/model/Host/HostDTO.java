package demetoir.vagi.model.Host;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of ="id")
public class HostDTO {

  private Integer id;

  private String oauthId;

  private String name;

  private String email;

  private String image;

  private Boolean emailFeedBack;

  private Timestamp createdAt;

  private Timestamp updatedAt;

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
        .build();
  }
}
