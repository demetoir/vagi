package demetoir.vagi.config.auth;

import lombok.extern.java.Log;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Log
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
  private String redirectLocation;

  public CustomAuthenticationSuccessHandler(String redirectLocation) {
    this.redirectLocation = redirectLocation;
  }

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request, HttpServletResponse response, Authentication authentication)
      throws IOException {

    HttpSession session = request.getSession();
    session.removeAttribute("prevPage");
    response.sendRedirect(redirectLocation);
  }
}
