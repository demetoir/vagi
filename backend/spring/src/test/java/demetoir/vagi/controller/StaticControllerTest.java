package demetoir.vagi.controller;

import demetoir.vagi.config.ReactAppRedirectURLConfig;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class StaticControllerTest {
  @Autowired private StaticController staticController;

  @Autowired private MockMvc mockMvc;

  @Autowired private ReactAppRedirectURLConfig reactAppRedirectURLConfig;

  @Before
  public void before() {}

  @Test
  void ableToDI() {
    assertThat(staticController).isNotNull();
    assertThat(reactAppRedirectURLConfig).isNotNull();
  }

  @Test
  void mainAppServe() throws Exception {

    this.mockMvc
        .perform(get("/main-app"))
        .andExpect(status().is3xxRedirection())
        .andExpect(redirectedUrl(reactAppRedirectURLConfig.getMainAppURL()));
  }

  @Test
  void hostAppServe() throws Exception {

    this.mockMvc
        .perform(get("/host-app"))
        .andExpect(status().is3xxRedirection())
        .andExpect(redirectedUrl(this.reactAppRedirectURLConfig.getHostAppURL()));
  }

  @Test
  void guestAppServe() throws Exception {
    String redirectPath = this.reactAppRedirectURLConfig.getGuestAppURL();

    this.mockMvc
        .perform(get("/guest-app"))
        .andExpect(status().is3xxRedirection())
        .andExpect(redirectedUrl(redirectPath));
  }
}
