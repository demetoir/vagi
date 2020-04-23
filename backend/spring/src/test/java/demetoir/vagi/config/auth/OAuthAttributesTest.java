package demetoir.vagi.config.auth;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static demetoir.vagi.config.auth.GoogleOathAttributeKey.*;
import static org.assertj.core.api.Assertions.assertThat;

class OAuthAttributesTest {
  @Test
  public void ableToBuilder() {
    var name = "name";
    var oauthId = "oauthId";
    var email = "email";
    var image = "image ";
    Map<String, Object> attributes = new HashMap<>();
    attributes.put("name", name);
    attributes.put("oauthId", oauthId);
    attributes.put("email", email);
    attributes.put("image", image);

    var nameAttributeKey = "sub";

    var oAuthAttributes =
        OAuthAttributes.builder()
            .name(name)
            .oauthId(oauthId)
            .email(email)
            .image(image)
            .attributes(attributes)
            .nameAttributeKey(nameAttributeKey)
            .build();

    assertThat(oAuthAttributes.getAttributes()).isEqualTo(attributes);
    assertThat(oAuthAttributes.getName()).isEqualTo(name);
    assertThat(oAuthAttributes.getOauthId()).isEqualTo(oauthId);
    assertThat(oAuthAttributes.getEmail()).isEqualTo(email);
    assertThat(oAuthAttributes.getImage()).isEqualTo(image);
    assertThat(oAuthAttributes.getNameAttributeKey()).isEqualTo(nameAttributeKey);
  }

  @Test
  public void able_to_of_google() {
    var nameAttributeKey = "sub";

    var name = "name";
    var oauthId = "oauthId";
    var email = "email";
    var image = "image ";
    Map<String, Object> attributes = new HashMap<>();
    attributes.put(NAME.getKey(), name);
    attributes.put(nameAttributeKey, oauthId);
    attributes.put(EMAIL.getKey(), email);
    attributes.put(IMAGE.getKey(), image);

    var oAuthAttributes = OAuthAttributes.of(nameAttributeKey, attributes);

    assertThat(oAuthAttributes.getAttributes()).isEqualTo(attributes);
    assertThat(oAuthAttributes.getName()).isEqualTo(name);
    assertThat(oAuthAttributes.getOauthId()).isEqualTo(oauthId);
    assertThat(oAuthAttributes.getEmail()).isEqualTo(email);
    assertThat(oAuthAttributes.getImage()).isEqualTo(image);
    assertThat(oAuthAttributes.getNameAttributeKey()).isEqualTo(nameAttributeKey);
  }
}
