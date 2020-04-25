package demetoir.vagi.config.JwtHelper;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "guest-jwt-helper-config")
@Getter
@Setter
public class GuestJwtHelperProperties {
  private String secret;
  private String aud;
  private String iss;
  private String sub;
  private Long expiredAt;
}
