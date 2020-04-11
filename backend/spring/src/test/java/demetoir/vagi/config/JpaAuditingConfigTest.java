package demetoir.vagi.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Java6Assertions.assertThat;

@SpringBootTest
class JpaAuditingConfigTest {
  @Autowired JpaAuditingConfig jpaAuditingConfig;

  @Test
  void Di() {
    assertThat(jpaAuditingConfig).isNotNull();
  }
}
