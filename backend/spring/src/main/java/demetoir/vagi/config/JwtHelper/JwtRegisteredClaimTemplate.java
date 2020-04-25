package demetoir.vagi.config.JwtHelper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class JwtRegisteredClaimTemplate {
  private final String iss;
  private final String sub;
  private final String aud;
  private final Long expiresAt;
}
