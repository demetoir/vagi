package demetoir.vagi.config.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  private final CustomOAuth2UserService customOauth2UserService;

  @Bean
  public OAuth2UserService defaultOAuth2UserService() {
    return new DefaultOAuth2UserService();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf()
        .disable()
        .headers()
        .frameOptions()
        .disable()
        .and()
        .authorizeRequests()
        .antMatchers(
            "/",
            "/css/**",
            "/image/**",
            "/js/**",
            "h2-console/**",
            "/guest-app",
            "/host-app",
            "/main-app")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .logout()
        .logoutSuccessUrl("/")
        .and()
        .oauth2Login()
        .userInfoEndpoint()
        .userService(customOauth2UserService)
        .and()
        //  redirectionEndpoint를 properties에 정의했으면 여기도 해야한다
        //  안그러면 userInfoEndpoint에 등록한 userService 가 실행되지 않는다....
        .redirectionEndpoint()
        .baseUri("/auth/google/callback");
  }
}
