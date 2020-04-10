package demetoir.vagi.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class RedirectPathConfig {
  // todo should inject different by mode

  @Value("${redirectPath.mainApp}")
  private String mainApp;

  @Value("${redirectPath.guestApp}")
  private String guestApp;

  @Value("${redirectPath.hostApp}")
  private String hostApp;
}
