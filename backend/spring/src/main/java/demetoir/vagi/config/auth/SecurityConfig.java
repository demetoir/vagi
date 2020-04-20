package demetoir.vagi.config.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  private final CustomOAuth2UserService customOauth2UserService;

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
            "/", "/css/**", "/image/**", "/js/**", "h2-console/**", "/auth/google/callback")
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
        .redirectionEndpoint()
        .baseUri("/auth/google/callback");
    ;
  }
}
