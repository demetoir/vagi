package demetoir.vagi.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  //  private final UserPrincipalDetailsService userPrincipalDetailsService;
  //  private final UserRepository userRepository;

  //  @Override
  //  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
  //    auth.authenticationProvider(authenticationProvider());
  //  }
  //
  //  @Bean
  //  DaoAuthenticationProvider authenticationProvider() {
  //    DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
  //    daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
  //    daoAuthenticationProvider.setUserDetailsService(this.userPrincipalDetailsService);
  //
  //    return daoAuthenticationProvider;
  //  }

  //  @Bean
  //  PasswordEncoder passwordEncoder() {
  //    return new BCryptPasswordEncoder();
  //  }

  /** JWT Authentication version */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        // remove csrf and state in session because in jwt we do not need them
        // csrf
        .csrf()
        .disable()
        // session
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        // add jwt filters (1. authentication, 2. authorization)
        //        .addFilter(new JwtAuthenticationFilter(authenticationManager()))
        //        .addFilter(new JwtAuthorizationFilter(authenticationManager(),
        // this.userRepository))
        //
        // configure access rules
        .authorizeRequests()
        // on login path
        .antMatchers("/", "/login**")
        .permitAll()
        // host guest
        .antMatchers("/host/only")
        .hasAnyRole("HOST")
        .antMatchers("/guest/only")
        .hasAnyRole("GUEST")
        // any path
            // this make oauth redirect to oauth login page
        .antMatchers("/oauth/login")
        .authenticated()
        .and()
        .oauth2Login()



    ;
  }
}
