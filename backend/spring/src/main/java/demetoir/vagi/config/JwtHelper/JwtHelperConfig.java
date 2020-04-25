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
    JwtRegisteredClaimTemplate claimTemplate =
            JwtRegisteredClaimTemplate.builder()
                    .aud(jwtHelperProperties.getAud())
                    .sub(jwtHelperProperties.getSub())
                    .iss(jwtHelperProperties.getIss())
                    .expiresAt(jwtHelperProperties.getExpiredAt() * 1000)
                    .build();


    return new JwtHelper(jwtHelperProperties.getSecret(), claimTemplate);
  }
}
