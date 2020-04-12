package demetoir.vagi.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Getter
@Configuration
public class ReactAppRedirectURLConfig {
  // todo should inject different by mode

  @Value("${redirectPath.mainApp}")
  private String mainAppURL;

  @Value("${redirectPath.guestApp}")
  private String guestAppURL;

  @Value("${redirectPath.hostApp}")
  private String hostAppURL;
}
