package demetoir.vagi.model.Guest;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class GuestDTOTest {

  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void ableToBuilder() {
    var guestSid = "sid";
    var company = "company";
    var email = "email";
    var name = "name";
    var isAnonymous = false;

    var guestDto =
        GuestDTO.builder()
            .guestSid(guestSid)
            .company(company)
            .email(email)
            .isAnonymous(isAnonymous)
            .name(name)
            .build();

    assertThat(guestDto).isNotNull();

    assertThat(guestDto.getGuestSid()).isEqualTo(guestSid);
    assertThat(guestDto.getCompany()).isEqualTo(company);
    assertThat(guestDto.getEmail()).isEqualTo(email);
    assertThat(guestDto.getIsAnonymous()).isEqualTo(isAnonymous);
    assertThat(guestDto.getName()).isEqualTo(name);
  }

  @Test
  void convertToEntityAndFromEntity() {
    var guestSid = "sid";
    var company = "company";
    var email = "email";
    var name = "name";
    var isAnonymous = false;

    var oldGuestDto =
        GuestDTO.builder()
            .guestSid(guestSid)
            .company(company)
            .email(email)
            .isAnonymous(isAnonymous)
            .name(name)
            .build();

    var guest = modelMapper.map(oldGuestDto, Guest.class);

    assertThat(guest).isEqualToComparingFieldByField(oldGuestDto);

    var guestDto = modelMapper.map(guest, GuestDTO.class);

    assertThat(guestDto).isEqualToComparingFieldByField(guest);
  }
}
