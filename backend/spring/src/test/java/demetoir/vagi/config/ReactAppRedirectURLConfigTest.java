package demetoir.vagi.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ReactAppRedirectURLConfigTest {
  @Autowired private ReactAppRedirectURLConfig reactAppRedirectURLConfig;

  @Autowired Environment environment;

  @Test
  void di() {
    assertThat(reactAppRedirectURLConfig).isNotNull();
  }

  @Test
  void mainApp() {
    assertThat(reactAppRedirectURLConfig.getMainAppURL()).isNotNull();
  }

  @Test
  void hostApp() {
    assertThat(reactAppRedirectURLConfig.getHostAppURL()).isNotNull();
  }

  @Test
  void guestApp() {
    assertThat(reactAppRedirectURLConfig.getGuestAppURL()).isNotNull();
  }
}
