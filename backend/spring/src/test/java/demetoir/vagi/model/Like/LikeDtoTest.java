package demetoir.vagi.model.Like;

import demetoir.vagi.model.Emoji.Emoji;
import demetoir.vagi.model.Emoji.EmojiDto;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class LikeDtoTest {
  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void builder() {

    var dto = EmojiDto.builder().build();

    assertThat(dto).isNotNull();
  }

  @Test
  void ConvertToEntityAndFromEntity() {

    var oldDto = EmojiDto.builder().build();

    var entity = modelMapper.map(oldDto, Emoji.class);

    assertThat(entity).isEqualToComparingFieldByField(oldDto);

    var dto = modelMapper.map(entity, EmojiDto.class);

    assertThat(dto).isEqualToComparingFieldByField(entity);
  }
}
