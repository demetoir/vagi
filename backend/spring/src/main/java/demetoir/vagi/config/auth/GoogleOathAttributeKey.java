package demetoir.vagi.config.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GoogleOathAttributeKey {
  NAME("name", "name_key"),
  IMAGE("picture", "image_key"),
  EMAIL("email", "email_key"),
  NAME_ATTRIBUTE("sub", "user name attribute");

  private final String key;
  private final String title;
}
