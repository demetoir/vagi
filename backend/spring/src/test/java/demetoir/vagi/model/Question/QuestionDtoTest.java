package demetoir.vagi.model.Question;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

class QuestionDtoTest {
  private ModelMapper modelMapper = new ModelMapper();

  @Test
  void requireObject() {
    assertThat(modelMapper).isNotNull();
  }

  @Test
  void builder() {

    String content = "content";
    boolean isStared = false;
    int likeCount = 3;
    String state = "state";
    var questionDto =
        QuestionDto.builder()
            .content(content)
            .isStared(isStared)
            .likeCount(likeCount)
            .state(state)
            .build();

    assertThat(questionDto).isNotNull();
    assertThat(questionDto.getContent()).isEqualTo(content);
    assertThat(questionDto.getIsStared()).isEqualTo(isStared);
    assertThat(questionDto.getLikeCount()).isEqualTo(likeCount);
    assertThat(questionDto.getState()).isEqualTo(state);
  }

  @Test
  void convertToEntityAndFromEntity() {

    String content = "content";
    boolean isStared = false;
    int likeCount = 3;
    String state = "state";
    var oldDto =
        QuestionDto.builder()
            .content(content)
            .isStared(isStared)
            .likeCount(likeCount)
            .state(state)
            .build();

    var question = modelMapper.map(oldDto, Question.class);

    assertThat(question).isEqualToComparingFieldByField(oldDto);

    var questionDto = modelMapper.map(question, QuestionDto.class);

    assertThat(questionDto).isEqualToComparingFieldByField(questionDto);
  }
}
