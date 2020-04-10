package demetoir.vagi.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class RedirectPathConfigTest {
  @Autowired private RedirectPathConfig redirectPathConfig;

  @Autowired Environment environment;

  @Test
  void di() {
    assertThat(redirectPathConfig).isNotNull();
  }

  @Test
  void mainApp() {
    assertThat(redirectPathConfig.getMainApp()).isNotNull();
  }

  @Test
  void hostApp() {
    assertThat(redirectPathConfig.getHostApp()).isNotNull();
  }

  @Test
  void guestApp() {
    assertThat(redirectPathConfig.getGuestApp()).isNotNull();
  }
}
