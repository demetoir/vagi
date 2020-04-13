package demetoir.vagi.model.Poll;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class PollDtoTest {

  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void builder() {

    boolean allowDuplication = false;
    String poll_name = "poll name";
    String poll_type = "poll type";
    String state = "state";
    String selection_type = "selection type";
    var dto =
        PollDto.builder()
            .allowDuplication(allowDuplication)
            .pollName(poll_name)
            .pollType(poll_type)
            .state(state)
            .selectionType(selection_type)
            .build();

    assertThat(dto).isNotNull();
  }

  @Test
  void ConvertToEntityAndFromEntity() {

    boolean allowDuplication = false;
    String poll_name = "poll name";
    String poll_type = "poll type";
    String state = "state";
    String selection_type = "selection type";
    var oldDto =
        PollDto.builder()
            .allowDuplication(allowDuplication)
            .pollName(poll_name)
            .pollType(poll_type)
            .state(state)
            .selectionType(selection_type)
            .build();

    var entity = modelMapper.map(oldDto, Poll.class);

    assertThat(entity).isEqualToComparingFieldByField(oldDto);

    var dto = modelMapper.map(entity, PollDto.class);

    assertThat(dto).isEqualToComparingFieldByField(entity);
  }
}
