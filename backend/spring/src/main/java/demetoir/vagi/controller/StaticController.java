package demetoir.vagi.controller;

import demetoir.vagi.config.ReactAppRedirectURLConfig;
import lombok.extern.java.Log;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log
@Controller
public class StaticController {
  final ReactAppRedirectURLConfig reactAppRedirectURLConfig;

  public StaticController(ReactAppRedirectURLConfig reactAppRedirectURLConfig) {
    this.reactAppRedirectURLConfig = reactAppRedirectURLConfig;
  }

  @RequestMapping("/main-app")
  public void mainAppServe(HttpServletResponse response) throws IOException {
    log.info("redirect to main-app");

    response.sendRedirect(reactAppRedirectURLConfig.getMainAppURL());
  }

  @RequestMapping("/host-app")
  public void hostAppServe(HttpServletResponse response) throws IOException {
    log.info("redirect to host-app");

    response.sendRedirect(reactAppRedirectURLConfig.getHostAppURL());
  }

  @RequestMapping("/guest-app")
  public void guestAppServe(HttpServletResponse response) throws IOException {
    log.info("redirect to guest-app");

    response.sendRedirect(reactAppRedirectURLConfig.getGuestAppURL());
  }
}
