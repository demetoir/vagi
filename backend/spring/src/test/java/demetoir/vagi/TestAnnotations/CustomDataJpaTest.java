package demetoir.vagi.TestAnnotations;

import demetoir.vagi.config.JpaAuditingConfig;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@Import(JpaAuditingConfig.class)
@DataJpaTest
public class CustomDataJpaTest {}
