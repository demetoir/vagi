package demetoir.vagi.model.Host;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class HostDTOTest {
  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void ableToBuilder() {
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
  void convertToEntityAndFromEntity() {
    var id = 12;
    var image = "image";
    var oauthId = "oauth";
    var name = "name";
    var email = "email";
    var emailFeedBack = false;
    var oldHostDto =
        HostDTO.builder()
            .image(image)
            .oauthId(oauthId)
            .name(name)
            .id(id)
            .email(email)
            .emailFeedBack(emailFeedBack)
            .build();

    var host = modelMapper.map(oldHostDto, Host.class);

    assertThat(host).isEqualToComparingFieldByField(oldHostDto);

    var hostDto = modelMapper.map(host, HostDTO.class);

    assertThat(hostDto).isEqualToComparingFieldByField(host);
  }
}
