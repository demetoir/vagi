package demetoir.vagi.model.Host;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HostRepository extends JpaRepository<Host, Integer> {
  // todo test
  Host findByOauthId(String oauthId);
}
