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
  @Autowired JpaAuditingConfig jpaAuditingConfig;

  @Test
  void di() {
    assertThat(hostRepository).isNotNull();
    assertThat(jpaAuditingConfig).isNotNull();
  }

  @Test
  void findOneByOauthId_return_entity() {
    String hostName = "hostName";
    String oauthId = "oauthId";
    String email = "email";

    var newHost = new Host();
    newHost.setName(hostName);
    newHost.setOauthId(oauthId);
    newHost.setEmail(email);

    var existHost = hostRepository.save(newHost);

    var hostOptional = hostRepository.findOneByOauthId(oauthId);

    assertThat(hostOptional.isPresent()).isTrue();

    var host = hostOptional.get();
    assertThat(host).isEqualTo(existHost);
  }

  @Test
  void findOneByOauthId_return_null_on_not_exist() {
    String oauthId = "oauthId";

    var hostOptional = hostRepository.findOneByOauthId(oauthId);

    assertThat(hostOptional.isPresent()).isFalse();
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
