package demetoir.vagi.config.JwtHelper;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;

import java.text.ParseException;

// ref:
// https://github.com/gesellix/Nimbus-JOSE-JWT/blob/master/src/test/java/example/JWSExample.java
public class JwtHelper {
  private final MACSigner signer;
  private final JWSHeader header;
  private final MACVerifier verifier;
  private final byte[] byteSecretKey;
  private final String secretKey;

  public JwtHelper(String secretKey) {
    this.secretKey = secretKey;
    this.byteSecretKey = this.secretKey.getBytes();
    this.header = new JWSHeader(JWSAlgorithm.HS256);

    try {
      this.signer = new MACSigner(byteSecretKey);
      this.verifier = new MACVerifier(byteSecretKey);
    } catch (JOSEException e) {
      throw new JwtHelperException("can not construct JWTHelper", e);
    }
  }

  public JWSObject verify(String token) {
    JWSObject parsedJWT;
    try {
      parsedJWT = JWSObject.parse(token);
    } catch (ParseException e) {
      throw new JwtHelperException("can not parse JWT", e);
    }

    boolean isVerified;
    try {
      isVerified = parsedJWT.verify(verifier);
    } catch (JOSEException e) {
      throw new JwtHelperException("can not verify JWT", e);
    }

    if (!isVerified) {
      throw new JwtHelperException("jwt is not valid");
    }

    return parsedJWT;
  }

  public String sign(JWTClaimsSet claims) {
    Payload payload = new Payload(claims.toJSONObject());
    JWSObject jweObject = new JWSObject(header, payload);

    try {
      jweObject.sign(signer);
    } catch (JOSEException e) {
      throw new JwtHelperException("can not sign JWT", e);
    }

    return jweObject.serialize();
  }
}
