package demetoir.vagi.config.JwtHelper;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Java6Assertions.assertThat;

// test
@RunWith(SpringRunner.class)
@SpringBootTest
class JwtHelperConfigTest {
  @Autowired HostJwtHelperProperties hostJwtHelperProperties;

  @Autowired GuestJwtHelperProperties guestJwtHelperProperties;

  @Test
  void ableToDi() {
    assertThat(hostJwtHelperProperties).isNotNull();
    assertThat(guestJwtHelperProperties).isNotNull();
  }
}
