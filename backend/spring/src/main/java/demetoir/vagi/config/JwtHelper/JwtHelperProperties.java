package demetoir.vagi.config.JwtHelper;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt-helper-config")
@Getter
@Setter
public class JwtHelperProperties {
  private String secret;
}
