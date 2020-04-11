package demetoir.vagi.controller;

import demetoir.vagi.config.ReactAppRedirectURLConfig;
import lombok.extern.java.Log;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Log
@Controller
public class StaticController {
  final ReactAppRedirectURLConfig reactAppRedirectURLConfig;

  public StaticController(ReactAppRedirectURLConfig reactAppRedirectURLConfig) {
    this.reactAppRedirectURLConfig = reactAppRedirectURLConfig;
  }

  @RequestMapping("/main-app")
  public String mainAppServe() {
    log.info("redirect to main-app");
    return "redirect:" + reactAppRedirectURLConfig.getMainAppURL();
  }

  @RequestMapping("/host-app")
  public String hostAppServe() {
    log.info("redirect to host-app");
    return "redirect:" + reactAppRedirectURLConfig.getHostAppURL();
  }

  @RequestMapping("/guest-app")
  public String guestAppServe() {
    log.info("redirect to guest-app");
    return "redirect:" + reactAppRedirectURLConfig.getGuestAppURL();
  }
}
