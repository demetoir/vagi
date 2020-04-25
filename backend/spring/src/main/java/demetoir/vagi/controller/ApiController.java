package demetoir.vagi.controller;

import demetoir.vagi.config.JwtHelper.JwtHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Log
@RequiredArgsConstructor
// @CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {

  @Autowired
  @Qualifier("hostJwtHelper")
  private JwtHelper hostJwtHelper;
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

  @PostMapping("/host/token")
  @ResponseBody
  public Map<String, Object> postHostToken(
      @AuthenticationPrincipal OAuth2User user, HttpServletResponse response) {

    // todo clean this
    var oauthId = user.getName();

    Map<String, Object> claims = new HashMap<>();
    claims.put("oauthId", oauthId);
    var token = hostJwtHelper.sign(claims);

    response.addHeader("Authorization", token);

    Map<String, Object> res = new HashMap<>();
    res.put("token", token);
    res.put("oauthId", oauthId);
    user.getAttribute("sub");

    return res;
  }
}
