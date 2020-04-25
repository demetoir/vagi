package demetoir.vagi.config;

import demetoir.vagi.etc.RandomNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
class EtcConfigTest {

  @Autowired RandomNameGenerator randomNameGenerator;

  @Test
  public void ableToDi() {
    assertThat(randomNameGenerator).isNotNull();
  }
}
