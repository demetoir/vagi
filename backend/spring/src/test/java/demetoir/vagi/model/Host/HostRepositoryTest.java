package demetoir.vagi.model.Host;

import demetoir.vagi.config.JpaAuditingConfig;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@Import(JpaAuditingConfig.class)
@DataJpaTest
class HostRepositoryTest {
  @Autowired HostRepository hostRepository;

  @Test
  void di() {
    assertThat(hostRepository).isNotNull();
  }

  @Test
  void findByOauthId() {
    String hostName = "hostName";
    String oauthId = "oauthId";
    String email = "email";

    var newHost = new Host();
    newHost.setName(hostName);
    newHost.setOauthId(oauthId);
    newHost.setEmail(email);

    var existHost = hostRepository.save(newHost);

    var host = hostRepository.findByOauthId(oauthId);

    assertThat(host).isNotNull();
    assertThat(host.getOauthId()).isEqualTo(oauthId);
    assertThat(host).isEqualTo(existHost);
  }

  @Test
  void createHost() {
    String hostName = "hostName";
    String oauthId = "oauthId";
    String email = "email";

    var host = new Host();
    host.setName(hostName);
    host.setOauthId(oauthId);
    host.setEmail(email);

    var existHost = hostRepository.save(host);

    assertThat(host).isNotNull();
    assertThat(host.getId()).isNotNull();
    assertThat(host).isEqualTo(existHost);
  }
}
