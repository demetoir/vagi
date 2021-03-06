package demetoir.vagi.model.Event;

import demetoir.vagi.config.JpaAuditingConfig;
import demetoir.vagi.model.Host.Host;
import demetoir.vagi.model.Host.HostRepository;
import lombok.extern.java.Log;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Java6Assertions.assertThat;

@Log
@RunWith(SpringRunner.class)
@Import(JpaAuditingConfig.class)
@DataJpaTest
class EventRepositoryTest {
  @Autowired EventRepository eventRepository;
  @Autowired HostRepository hostRepository;
  @Autowired JpaAuditingConfig jpaAuditingConfig;

  @Test
  void di() {
    assertThat(eventRepository).isNotNull();
    assertThat(hostRepository).isNotNull();
    assertThat(jpaAuditingConfig).isNotNull();
  }

  @Test
  void create() {
    String hostName = "hostName";
    String oauthId = "oauthId";
    String email = "email";

    var host = new Host();
    host.setName(hostName);
    host.setOauthId(oauthId);
    host.setEmail(email);

    var existHost = hostRepository.save(host);

    var eventName = "eventName";
    var endAt = new Timestamp(new Date().getTime());
    var startAt = new Timestamp(new Date().getTime());
    var eventCode = "eventCode";

    var event =
        Event.builder()
            .eventName(eventName)
            .eventCode(eventCode)
            .startAt(startAt)
            .endAt(endAt)
            .build();

    existHost.getEvents().add(event);
    event.setHost(existHost);

    var newEvent = eventRepository.save(event);

    assertThat(newEvent).isNotNull();
    assertThat(newEvent.getEventName()).isEqualTo(eventName);
    assertThat(newEvent.getEndAt()).isEqualTo(endAt);
    assertThat(newEvent.getStartAt()).isEqualTo(startAt);
    assertThat(newEvent.getEventCode()).isEqualTo(eventCode);
    assertThat(newEvent.getHost()).isEqualTo(existHost);
  }

  @Test
  void findOneByEventCode() {

    String hostName = "hostName";
    String oauthId = "oauthId";
    String email = "email";

    var host = new Host();
    host.setName(hostName);
    host.setOauthId(oauthId);
    host.setEmail(email);

    var existHost = hostRepository.save(host);

    var eventName = "eventName";
    var endAt = new Timestamp(new Date().getTime());
    var startAt = new Timestamp(new Date().getTime());
    var eventCode = "eventCode";

    var existEvent =
        Event.builder()
            .eventName(eventName)
            .eventCode(eventCode)
            .startAt(startAt)
            .endAt(endAt)
            .build();

    existHost.getEvents().add(existEvent);
    existEvent.setHost(existHost);

    eventRepository.save(existEvent);

    Optional<Event> eventOptional = eventRepository.findOneByEventCode(eventCode);

    assertThat(eventOptional.isPresent()).isTrue();

    var event = eventOptional.get();

    assertThat(event).isEqualTo(existEvent);
  }

  @Test
  void findOneByEventCode_return_null_on_not_exist() {
    var eventCode = "eventCode";

    Optional<Event> eventOptional = eventRepository.findOneByEventCode(eventCode);

    assertThat(eventOptional.isPresent()).isFalse();
  }
}
