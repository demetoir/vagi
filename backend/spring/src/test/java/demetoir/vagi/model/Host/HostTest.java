package demetoir.vagi.model.Host;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Java6Assertions.assertThat;

class HostTest {
  @Test
  void builder() {
    var image = "image";
    var oauthId = "oauth";
    var name = "name";
    var email = "email";
    var emailFeedBack = false;

    var host =
        Host.builder()
            .image(image)
            .oauthId(oauthId)
            .name(name)
            .email(email)
            .emailFeedBack(emailFeedBack)
            .build();

    assertThat(host).isNotNull();
    assertThat(host.getImage()).isEqualTo(image);
    assertThat(host.getOauthId()).isEqualTo(oauthId);
    assertThat(host.getName()).isEqualTo(name);
    assertThat(host.getEmail()).isEqualTo(email);
    assertThat(host.getEmailFeedBack()).isEqualTo(emailFeedBack);
  }
}
