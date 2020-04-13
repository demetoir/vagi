package demetoir.vagi.model.Candidate;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class CandidateDtoTest {

  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void builder() {

    int number = 3;
    String content = "content";
    var dto = CandidateDto.builder().content(content).number(number).build();

    assertThat(dto).isNotNull();
  }

  @Test
  void ConvertToEntityAndFromEntity() {

    int number = 3;
    String content = "content";
    var oldDto = CandidateDto.builder().content(content).number(number).build();

    var entity = modelMapper.map(oldDto, Candidate.class);

    assertThat(entity).isEqualToComparingFieldByField(oldDto);

    var dto = modelMapper.map(entity, CandidateDto.class);

    assertThat(dto).isEqualToComparingFieldByField(entity);
  }
}
