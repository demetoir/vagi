package demetoir.vagi.model.Host;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class HostRepositoryTest {
  @Autowired HostRepository hostRepository;

  @Test
  void di() {
    assertThat(hostRepository).isNotNull();
  }
}
