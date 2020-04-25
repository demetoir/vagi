package demetoir.vagi.config.JwtHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({HostJwtHelperProperties.class, GuestJwtHelperProperties.class})
public class JwtHelperConfig {

  @Autowired HostJwtHelperProperties hostJwtHelperProperties;

  @Autowired GuestJwtHelperProperties guestJwtHelperProperties;

  @Bean
  public JwtHelper hostJwtHelper() {
    JwtRegisteredClaimTemplate claimTemplate =
        JwtRegisteredClaimTemplate.builder()
            .aud(hostJwtHelperProperties.getAud())
            .sub(hostJwtHelperProperties.getSub())
            .iss(hostJwtHelperProperties.getIss())
            .expiresAt(hostJwtHelperProperties.getExpiredAt() * 1000)
            .build();

    return new JwtHelper(hostJwtHelperProperties.getSecret(), claimTemplate);
  }

  @Bean
  public JwtHelper guestJwtHelper() {
    JwtRegisteredClaimTemplate claimTemplate =
        JwtRegisteredClaimTemplate.builder()
            .aud(guestJwtHelperProperties.getAud())
            .sub(guestJwtHelperProperties.getSub())
            .iss(guestJwtHelperProperties.getIss())
            .expiresAt(guestJwtHelperProperties.getExpiredAt() * 1000)
            .build();

    return new JwtHelper(guestJwtHelperProperties.getSecret(), claimTemplate);
  }
}
