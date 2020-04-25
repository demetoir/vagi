package demetoir.vagi.config.JwtHelper;

import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.java.Log;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.assertj.core.api.Java6Assertions.assertThatThrownBy;

@Log
class JwtHelperTest {

  private String secret = "secret_key_secret_key_secret_key_secret_key_secret_key";
  private String otherSecret = "other_key_other_key_other_key_other_key_other_key_other_key";

  private JwtRegisteredClaimTemplate claimTemplate;

  @BeforeEach
  public void beforeEach() {
    String aud = "aud";
    String iss = "iss";
    String sub = "sub";

    this.claimTemplate =
        JwtRegisteredClaimTemplate.builder()
            .aud(aud)
            .sub(sub)
            .iss(iss)
            .expiresAt(1000 * 60 * 60L)
            .build();
  }

  @Test
  public void ableToConstruct() {
    JwtHelper jwtHelper = new JwtHelper(secret, claimTemplate);

    assertThat(jwtHelper).isNotNull();
  }

  @Test
  void sign_and_verify() {
    JwtHelper jwtHelper = new JwtHelper(secret, claimTemplate);

    Map<String, Object> claims = new HashMap<>();
    claims.put("email", "sanjay@example.com");
    claims.put("name", "Sanjay Patel");

    var token = jwtHelper.sign(claims);
    assertThat(token).isNotNull().isInstanceOf(String.class);

    DecodedJWT verified = jwtHelper.verify(token);

    assertThat(verified.getClaim("email").asString()).isEqualTo("sanjay@example.com");
    assertThat(verified.getClaim("name").asString()).isEqualTo("Sanjay Patel");
  }

  @Test
  void verify_throw_error_can_not_parse() {
    JwtHelper jwtHelper = new JwtHelper(secret, claimTemplate);

    var token = "this is not jwt";
    assertThat(token).isNotNull().isInstanceOf(String.class);

    assertThatThrownBy(
            () -> {
              jwtHelper.verify(token);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("can not verify jwt");
  }

  @Test
  void verify_throw_error_is_not_valid_on_diff_secret() {
    JwtHelper jwtHelper = new JwtHelper(secret, claimTemplate);

    Map<String, Object> claims = new HashMap<>();
    var token = jwtHelper.sign(claims);

    JwtHelper otherJwtHelper = new JwtHelper(otherSecret, claimTemplate);

    assertThatThrownBy(
            () -> {
              otherJwtHelper.verify(token);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("can not verify jwt");
  }

  @Test
  void verify_throw_error_is_not_valid_on_expired() {
    JwtHelper jwtHelper = new JwtHelper(secret, claimTemplate);

    var after = Instant.now().minus(100, ChronoUnit.SECONDS);
    Date exp = Date.from(after);
    Map<String, Object> claims = new HashMap<>();
    claims.put("exp", exp);

    var token = jwtHelper.sign(claims);

    assertThatThrownBy(
            () -> {
              jwtHelper.verify(token);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("can not verify jwt");
  }

  @Test
  void verify_throw_error_is_not_valid_on_diff_aud() {
    JwtHelper jwtHelper = new JwtHelper(secret, claimTemplate);

    Map<String, Object> claims = new HashMap<>();
    claims.put("aud", "other aud");

    var token = jwtHelper.sign(claims);

    assertThatThrownBy(
            () -> {
              jwtHelper.verify(token);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("can not verify jwt");
  }

  @Test
  void verify_throw_error_is_not_valid_on_diff_iss() {
    JwtHelper jwtHelper = new JwtHelper(secret, claimTemplate);

    Map<String, Object> claims = new HashMap<>();
    claims.put("iss", "other iss");

    var token = jwtHelper.sign(claims);

    assertThatThrownBy(
            () -> {
              jwtHelper.verify(token);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("can not verify jwt");
  }

  @Test
  void verify_throw_error_is_not_valid_on_diff_sub() {
    JwtHelper jwtHelper = new JwtHelper(secret, claimTemplate);

    Map<String, Object> claims = new HashMap<>();
    claims.put("sub", "other sub");

    var token = jwtHelper.sign(claims);

    assertThatThrownBy(
            () -> {
              jwtHelper.verify(token);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("can not verify jwt");
  }
}
