package demetoir.vagi.config.JwtHelper;

public class JwtHelperException extends RuntimeException {
  public JwtHelperException(String message) {
    super(message);
  }

  public JwtHelperException(String message, Throwable cause) {
    super(message, cause);
  }
}
