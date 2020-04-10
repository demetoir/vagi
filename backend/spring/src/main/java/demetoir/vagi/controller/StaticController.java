package demetoir.vagi.controller;

import lombok.extern.java.Log;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Log
public class StaticController {
  @RequestMapping("/main-app")
  public String mainAppServe() {
    log.info("redirect to main-app");
    return "redirect:http://localhost:5000";
  }

  @RequestMapping("/host-app")
  public String hostAppServe() {
    log.info("redirect to host-app");
    return "redirect:http://localhost:5001";
  }

  @RequestMapping("/guest-app")
  public String guestAppServe() {
    log.info("redirect to guest-app");
    return "redirect:http://localhost:5002";
  }
}
