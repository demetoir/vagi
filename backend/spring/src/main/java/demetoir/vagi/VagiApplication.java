package demetoir.vagi;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VagiApplication {

  public static void main(String[] args) {
    SpringApplication.run(VagiApplication.class, args);
  }

  @Bean
  public ModelMapper modelMapper() {
    // todo this may problem
    var modelMapper = new ModelMapper();
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    return modelMapper;
  };
}
