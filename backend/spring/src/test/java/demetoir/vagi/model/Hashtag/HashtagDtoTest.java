package demetoir.vagi.model.Hashtag;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class HashtagDtoTest {
  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void builder() {
    String name = "name";
    var hastagDto = HashtagDto.builder().name(name).build();

    assertThat(hastagDto).isNotNull();
    assertThat(hastagDto.getName()).isEqualTo(name);
  }

  @Test
  void convertToEntityAndFromEntity() {

    String name = "name";
    var oldDto = HashtagDto.builder().name(name).build();

    assertThat(oldDto).isNotNull();
    assertThat(oldDto.getName()).isEqualTo(name);

    var hashtag = modelMapper.map(oldDto, Hashtag.class);

    assertThat(hashtag).isEqualToComparingFieldByField(oldDto);

    var dto = modelMapper.map(hashtag, HashtagDto.class);

    assertThat(dto).isEqualToComparingFieldByField(hashtag);
  }
}
