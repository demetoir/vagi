package demetoir.vagi.model.Host;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HostRepository extends JpaRepository<Host, Integer> {
  <S extends Host> Optional<S> findOneByOauthId(String oauthId);
}
