package demetoir.vagi.config.auth;

import demetoir.vagi.model.Host.Host;
import demetoir.vagi.model.Host.HostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static demetoir.vagi.config.auth.GoogleOathAttributeKey.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.RETURNS_DEEP_STUBS;
import static org.mockito.Mockito.mock;

@RunWith(SpringRunner.class)
@SpringBootTest
class CustomOAuth2UserServiceTest {
  @Autowired HostRepository hostRepository;

  @Autowired CustomOAuth2UserService customOAuth2UserService;

  @MockBean(name = "defaultOAuth2UserService")
  private DefaultOAuth2UserService defaultOAuth2UserService;

  @Test
  public void ableToDI() {
    assertThat(hostRepository).isNotNull();
    assertThat(customOAuth2UserService).isNotNull();
    assertThat(defaultOAuth2UserService).isNotNull();
  }

  @Test
  void loadUser_on_google() {
    // given
    // mock userRequest
    OAuth2UserRequest userRequest = mock(OAuth2UserRequest.class, RETURNS_DEEP_STUBS);
    given(
            userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName())
        .willReturn(NAME_ATTRIBUTE.getKey());

    given(userRequest.getClientRegistration().getRegistrationId()).willReturn("registrationId");

    // mock oauth2User
    String oauthId = "oauthId";
    Map<String, Object> attributes = createAttributes(oauthId);
    OAuth2User oauth2User = mock(OAuth2User.class);
    given(oauth2User.getAttributes()).willReturn(attributes);

    // mock bean defaultOAuth2UserService
    given(defaultOAuth2UserService.loadUser(userRequest)).willReturn(oauth2User);

    // when
    var oAuth2User = customOAuth2UserService.loadUser(userRequest);

    // than
    assertThat(oAuth2User).isNotNull();

    assertThat(oAuth2User.getAuthorities())
        .isEqualTo(Collections.singleton(new SimpleGrantedAuthority(Role.HOST.getKey())));
    assertThat(oAuth2User.getAttributes()).isEqualTo(attributes);
    assertThat(oAuth2User.getName()).isEqualTo(oauthId);
  }

  @BeforeEach
  void setup() {
    hostRepository.deleteAll();
  }

  @Test
  void saveOrUpdateHost_on_new_host_should_save() {
    // given
    var oAuthAttributes = createOAuthAttributes("oauthId 1");

    // when
    var host = customOAuth2UserService.saveOrUpdateHost(oAuthAttributes);

    // than
    var inDBHost = hostRepository.findById(host.getId()).orElseThrow();
    assertThat(host).isEqualTo(inDBHost);
  }

  @Test
  void saveOrUpdateHost_on_exist_host_should_update() {
    // given

    String oauthId = "oauthId";
    var newHost =
        Host.builder().name("oldName").email("oldEmail").oauthId(oauthId).image("oldImage").build();
    var existHost = hostRepository.save(newHost);

    var oAuthAttributes = createOAuthAttributes(oauthId);

    // when
    var host = customOAuth2UserService.saveOrUpdateHost(oAuthAttributes);

    // than
    assertThat(host.getId()).isEqualTo(existHost.getId());

    var inDb = hostRepository.findById(newHost.getId()).orElseThrow();
    assertThat(host).isEqualTo(inDb);
  }

  public Map<String, Object> createAttributes(String oauthId) {
    var name = "name";
    var email = "email";
    var image = "image ";
    Map<String, Object> attributes = new HashMap<>();

    attributes.put(NAME_ATTRIBUTE.getKey(), oauthId);
    attributes.put(NAME.getKey(), name);
    attributes.put(EMAIL.getKey(), email);
    attributes.put(IMAGE.getKey(), image);

    return attributes;
  }

  public OAuthAttributes createOAuthAttributes(String oauthId) {
    return OAuthAttributes.of(NAME_ATTRIBUTE.getKey(), createAttributes(oauthId));
  }
}
