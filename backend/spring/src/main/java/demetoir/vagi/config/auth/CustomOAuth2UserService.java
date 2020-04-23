package demetoir.vagi.config.auth;

import demetoir.vagi.model.Host.Host;
import demetoir.vagi.model.Host.HostRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

  private static final Log log = LogFactory.getLog(CustomOAuth2UserService.class);

  @Autowired private ModelMapper modelMapper;

  @Autowired private HostRepository hostRepository;

  @Autowired
  @Qualifier("defaultOAuth2UserService")
  private OAuth2UserService delegate;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oauth2User = delegate.loadUser(userRequest);

    String registrationId = userRequest.getClientRegistration().getRegistrationId();
    String userNameAttributeName =
        userRequest
            .getClientRegistration()
            .getProviderDetails()
            .getUserInfoEndpoint()
            .getUserNameAttributeName();

    OAuthAttributes oAuthAttributes =
        OAuthAttributes.of(userNameAttributeName, oauth2User.getAttributes());

    Host host = saveOrUpdateHost(oAuthAttributes);
    log.info(host);

    // todo check, need session?
    //    httpSession.setAttribute("user", new SessionUser(user));

    var hostRole = Role.HOST.getKey();
    var roles = Collections.singleton(new SimpleGrantedAuthority(hostRole));
    var attributes = oAuthAttributes.getAttributes();
    var nameAttributeKey = oAuthAttributes.getNameAttributeKey();

    return new DefaultOAuth2User(roles, attributes, nameAttributeKey);
  }

  @Transactional
  public Host saveOrUpdateHost(OAuthAttributes oAuthAttributes) {
    String oauthId = oAuthAttributes.getOauthId();
    var hostOptional = hostRepository.findOneByOauthId(oauthId);

    if (hostOptional.isEmpty()) {
      var newHost = modelMapper.map(oAuthAttributes, Host.class);
      hostRepository.save(newHost);

      return newHost;
    }

    return hostOptional.get();
  }
}
