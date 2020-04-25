package demetoir.vagi.config;

import demetoir.vagi.libs.RandomNameGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class LibsConfig {
  @Bean
  public RandomNameGenerator randomNameGenerator() throws IOException {
    return new RandomNameGenerator();
  }
}
