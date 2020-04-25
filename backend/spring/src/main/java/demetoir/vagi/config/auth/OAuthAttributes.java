package demetoir.vagi.config.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

import static demetoir.vagi.config.auth.GoogleOathAttributeKey.*;

@Builder
@AllArgsConstructor
@Getter
public class OAuthAttributes {
  private String name;
  private String oauthId;
  private String email;
  private String image;
  private Map<String, Object> attributes;
  private String nameAttributeKey;

  public static OAuthAttributes of(String userNameAttributeName, Map<String, Object> attributes) {
    return OAuthAttributes.ofGoogle(userNameAttributeName, attributes);
  }

  public static OAuthAttributes ofGoogle(String nameAttributeKey, Map<String, Object> attributes) {

    var oauthId = (String) attributes.get(nameAttributeKey);
    var name = (String) attributes.get(NAME.getKey());
    var image = (String) attributes.get(IMAGE.getKey());
    var email = (String) attributes.get(EMAIL.getKey());

    return OAuthAttributes.builder()
        .email(email)
        .image(image)
        .name(name)
        .oauthId(oauthId)
        .attributes(attributes)
        .nameAttributeKey(nameAttributeKey)
        .build();
  }
}
