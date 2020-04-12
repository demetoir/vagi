package demetoir.vagi.model.Guest;

import demetoir.vagi.config.JpaAuditingConfig;
import demetoir.vagi.model.Event.EventRepository;
import org.junit.jupiter.api.DisplayName;
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
class GuestRepositoryTest {

  @Autowired EventRepository eventRepository;
  @Autowired GuestRepository guestRepository;
  @Autowired JpaAuditingConfig jpaAuditingConfig;

  @DisplayName("test에 필요한 bean DI")
  @Test
  void di() {
    assertThat(eventRepository).isNotNull();
    assertThat(guestRepository).isNotNull();
    assertThat(jpaAuditingConfig).isNotNull();
  }

  @Test
  void createGuest() {
    // todo

  }

  @Test
  void findGuestById() {
    // todo

  }

  @Test
  void findByGuestSid() {
    // todo

  }

  @Test
  void associateWithEvent() {
    // todo

  }

  @Test
  void autoCreatedAT() {
    // todo

  }

  @Test
  void autoUpdatedAt() {
    // todo

  }
}
