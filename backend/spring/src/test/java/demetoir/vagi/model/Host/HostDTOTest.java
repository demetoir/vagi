package demetoir.vagi.model.Host;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Java6Assertions.assertThat;

class HostDTOTest {
  @Test
  void builder() {
    var image = "image";
    var oauthId = "oauth";
    var name = "name";
    var email = "email";
    var emailFeedBack = false;

    var hostDto =
        HostDTO.builder()
            .image(image)
            .oauthId(oauthId)
            .name(name)
            .email(email)
            .emailFeedBack(emailFeedBack)
            .build();

    assertThat(hostDto).isNotNull();
    assertThat(hostDto.getImage()).isEqualTo(image);
    assertThat(hostDto.getOauthId()).isEqualTo(oauthId);
    assertThat(hostDto.getName()).isEqualTo(name);
    assertThat(hostDto.getEmail()).isEqualTo(email);
    assertThat(hostDto.getEmailFeedBack()).isEqualTo(emailFeedBack);
  }

  @Test
  void toEntity() {
    var id = 12;
    var image = "image";
    var oauthId = "oauth";
    var name = "name";
    var email = "email";
    var emailFeedBack = false;
    var hostDto =
        HostDTO.builder()
            .image(image)
            .oauthId(oauthId)
            .name(name)
            .id(id)
            .email(email)
            .emailFeedBack(emailFeedBack)
            .build();

    var host = hostDto.toEntity();

    assertThat(host).isNotNull();
    assertThat(host.getImage()).isEqualTo(image);
    assertThat(host.getOauthId()).isEqualTo(oauthId);
    assertThat(host.getName()).isEqualTo(name);
    assertThat(host.getEmail()).isEqualTo(email);
    assertThat(host.getEmailFeedBack()).isEqualTo(emailFeedBack);
  }

  @Test
  void fromEntity() {
    var id = 12;
    var image = "image";
    var oauthId = "oauth";
    var name = "name";
    var email = "email";
    var emailFeedBack = false;
    var oldHostDto =
        HostDTO.builder()
            .id(id)
            .image(image)
            .oauthId(oauthId)
            .name(name)
            .email(email)
            .emailFeedBack(emailFeedBack)
            .build();

    var host = oldHostDto.toEntity();

    var hostDto = HostDTO.fromEntity(host);

    assertThat(hostDto).isEqualTo(oldHostDto);
  }
}
