package demetoir.vagi.model.Emoji;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class EmojiDtoTest {

  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void builder() {

    String name = "name";
    var dto = EmojiDto.builder().name(name).build();

    assertThat(dto).isNotNull();
    assertThat(dto.getName()).isEqualTo(name);
  }

  @Test
  void ConvertToEntityAndFromEntity() {
    String name = "name";
    var oldDto = EmojiDto.builder().name(name).build();

    var entity = modelMapper.map(oldDto, Emoji.class);

    assertThat(entity).isEqualToComparingFieldByField(oldDto);

    var dto = modelMapper.map(entity, EmojiDto.class);

    assertThat(dto).isEqualToComparingFieldByField(entity);
  }
}
