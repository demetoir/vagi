package demetoir.vagi.config.auth;

import org.junit.jupiter.api.Test;

import static demetoir.vagi.config.auth.GoogleOathAttributeKey.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

class GoogleOathAttributeKeyTest {

  @Test
  void able_toGet() {
    assertEquals(NAME.getKey(), "name");
    assertEquals(IMAGE.getKey(), "picture");
    assertEquals(EMAIL.getKey(), "email");
    assertEquals(NAME_ATTRIBUTE.getKey(), "sub");
  }
}
