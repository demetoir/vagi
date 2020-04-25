package demetoir.vagi.config.JwtHelper;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.java.Log;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

// ref:
// https://github.com/gesellix/Nimbus-JOSE-JWT/blob/master/src/test/java/example/JWSExample.java
@Log
public class JwtHelper {

  public static final long EXPIRES_AT = 30L;

  private final String secretKey;
  private final JwtRegisteredClaimTemplate template;
  private final Algorithm algorithm;
  private final JWTVerifier verifier;

  public JwtHelper(String secretKey, JwtRegisteredClaimTemplate template) {
    this.secretKey = secretKey;
    this.template = template;
    this.algorithm = Algorithm.HMAC256(this.secretKey);
    this.verifier =
        JWT.require(this.algorithm)
            .withIssuer(template.getIss())
            .withSubject(template.getSub())
            .withAudience(template.getAud())
            .acceptExpiresAt(EXPIRES_AT)
            .build();
  }

  public String sign(Map<String, Object> privateClaims) {
    try {
      var after = Instant.now().plus(1, ChronoUnit.HOURS);
      Date exp = Date.from(after);

      var jwt =
          JWT.create()
              .withIssuer(template.getIss())
              .withSubject(template.getSub())
              .withAudience(template.getAud())
              .withExpiresAt(exp);

      for (var key : privateClaims.keySet()) {
        jwt = jwt.withClaim(key, privateClaims.get(key).toString());
      }

      return jwt.sign(this.algorithm);
    } catch (JWTCreationException exception) {
      throw new JwtHelperException("can not sign jwt", exception);
    }
  }

  public DecodedJWT verify(String token) {
    try {
      return verifier.verify(token);
    } catch (JWTVerificationException exception) {
      throw new JwtHelperException("can not verify jwt", exception);
    }
  }
}
