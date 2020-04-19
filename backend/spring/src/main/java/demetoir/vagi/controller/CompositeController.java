package demetoir.vagi.controller;

import demetoir.vagi.config.ReactAppRedirectURLConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class CompositeController {

  final ReactAppRedirectURLConfig reactAppRedirectURLConfig;

  //  @GetMapping("/auth/google/login")
  //  public String googleLogin() {
  //    return "redirect:http://localhost/auth/google/callback";
  //  }
  //
  //  @GetMapping("/auth/google/callback")
  //  public String googleCallback() {
  //    return "redirect:http://localhost/host";
  //  }

  @GetMapping("/host/")
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
}
