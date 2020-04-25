package demetoir.vagi.config;

import demetoir.vagi.etc.RandomNameGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class EtcConfig {
  @Bean
  public RandomNameGenerator randomNameGenerator() throws IOException {
    return new RandomNameGenerator();
  }
}
