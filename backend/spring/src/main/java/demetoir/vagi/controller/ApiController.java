package demetoir.vagi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log
@RequiredArgsConstructor
// @CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class ApiController {

  //  final ReactAppRedirectURLConfig reactAppRedirectURLConfig;

  //  @GetMapping("/auth/google/login")
  //  public String googleLogin() {
  //    return "redirect:http://localhost/auth/google/callback";
  //  }
  //
  //  @GetMapping("/auth/google/callback")
  //  public String googleCallback() {
  //    return "redirect:http://localhost/host";
  //  }

  @GetMapping("/host")
  public String hostJWTLogin() {
    return "";
  }

  @GetMapping("/host/logout")
  public String logout() {
    return "redirect:http://localhost/main-app";
  }

  @GetMapping("/guest")
  public String guestLogin() {
    return "redirect:http://localhost/guest-app";
  }

  @GetMapping("/guest/logout")
  public String guestLogout() {
    return "redirect:http://localhost/main-app";
  }

  @GetMapping("/hello")
  public String hello() {
    return "hello";
  }

  @GetMapping("/guest/only")
  public String guestOnly() {
    return "guest/only";
  }

  @GetMapping("/host/only")
  public String hostOnly() {
    return "host/ony";
  }

  @GetMapping("/auth/google/callback")
  public String oauthGoogleCallback() {
    return "googleCallback";
  }

  @GetMapping("/host/token")
  public String hostToken(@AuthenticationPrincipal OAuth2User user) {
    log.info(user.toString());

    // todo generate host token

    return "host_token";
  }
}
