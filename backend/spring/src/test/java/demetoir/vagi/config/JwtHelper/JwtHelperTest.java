package demetoir.vagi.config.JwtHelper;

import com.nimbusds.jwt.JWTClaimsSet;
import lombok.extern.java.Log;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.assertj.core.api.Java6Assertions.assertThatThrownBy;

@Log
class JwtHelperTest {

  private String secret = "secret_key_secret_key_secret_key_secret_key_secret_key";
  private String otherSecret = "other_key_other_key_other_key_other_key_other_key_other_key";

  @Test
  public void ableToConstruct() {
    JwtHelper jwtHelper = new JwtHelper(secret);

    assertThat(jwtHelper).isNotNull();
  }

  @Test
  public void ableToConstruct_throwErrorOn_byteSecretKey() {
    assertThatThrownBy(
            () -> {
              var secret = "less than 256bit";
              JwtHelper jwtHelper = new JwtHelper(secret);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("can not construct JWTHelper");
  }

  @Test
  void sign_and_verify() {

    JwtHelper jwtHelper = new JwtHelper(secret);

    JWTClaimsSet claims =
        new JWTClaimsSet.Builder()
            .claim("email", "sanjay@example.com")
            .claim("name", "Sanjay Patel")
            .build();

    var token = jwtHelper.sign(claims);
    assertThat(token).isNotNull().isInstanceOf(String.class);

    var verified = jwtHelper.verify(token);
    var json = verified.getPayload().toJSONObject();

    assertThat(json.get("email")).isEqualTo("sanjay@example.com");
    assertThat(json.get("name")).isEqualTo("Sanjay Patel");
  }

  @Test
  void verify_throw_error_can_not_parse() {
    JwtHelper jwtHelper = new JwtHelper(secret);

    var token = "this is not jwt";
    assertThat(token).isNotNull().isInstanceOf(String.class);

    assertThatThrownBy(
            () -> {
              var verified = jwtHelper.verify(token);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("can not parse JWT");
  }

  @Test
  void verify_throw_error_is_not_valid() {
    JwtHelper jwtHelper = new JwtHelper(secret);

    JWTClaimsSet claims =
        new JWTClaimsSet.Builder()
            .claim("email", "sanjay@example.com")
            .claim("name", "Sanjay Patel")
            .build();

    var token = jwtHelper.sign(claims);

    JwtHelper otherJwtHelper = new JwtHelper(otherSecret);

    assertThatThrownBy(
            () -> {
              var verified = otherJwtHelper.verify(token);
            })
        .isInstanceOf(JwtHelperException.class)
        .hasMessage("jwt is not valid");
  }

  @Test
  void sign_throw_error_can_not_sign() {
    // todo how to make error?
  }

  @Test
  void verify_throw_error_can_not_verify() {
    // todo how to make error?
  }
}
