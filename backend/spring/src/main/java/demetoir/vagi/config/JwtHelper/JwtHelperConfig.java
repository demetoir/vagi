package demetoir.vagi.config.JwtHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(JwtHelperProperties.class)
public class JwtHelperConfig {

  @Autowired
  JwtHelperProperties jwtHelperProperties;

  @Bean
  public JwtHelper hostJwtHelper() {
    return new JwtHelper(jwtHelperProperties.getSecret());
  }
}
