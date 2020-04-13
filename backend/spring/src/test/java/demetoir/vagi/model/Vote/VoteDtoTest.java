package demetoir.vagi.model.Vote;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class VoteDtoTest {
  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void builder() {

    var dto = VoteDto.builder().build();

    assertThat(dto).isNotNull();
  }

  @Test
  void ConvertToEntityAndFromEntity() {

    var oldDto = VoteDto.builder().build();

    var entity = modelMapper.map(oldDto, Vote.class);

    assertThat(entity).isEqualToComparingFieldByField(oldDto);

    var dto = modelMapper.map(entity, VoteDto.class);

    assertThat(dto).isEqualToComparingFieldByField(entity);
  }
}
