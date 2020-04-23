package demetoir.vagi.config.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    HOST("ROLE_HOST", "host"),
    USER("ROLE_GUEST", "guest");

    private final String key;
    private final String title;
}
