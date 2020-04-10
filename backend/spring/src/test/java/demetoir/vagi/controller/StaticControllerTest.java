package demetoir.vagi.controller;

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

  @Before
  public void before() {}

  @Test
  void ableToRun() {
    assertThat(staticController).isNotNull();
  }

  @Test
  void mainAppServe() throws Exception {

    this.mockMvc
        .perform(get("/main-app"))
        .andExpect(status().is3xxRedirection())
        .andExpect(redirectedUrl("http://localhost:5000"));
  }

  @Test
  void hostAppServe() throws Exception {
    this.mockMvc
        .perform(get("/host-app"))
        .andExpect(status().is3xxRedirection())
        .andExpect(redirectedUrl("http://localhost:5001"));
  }

  @Test
  void guestAppServe() throws Exception {
    this.mockMvc
        .perform(get("/guest-app"))
        .andExpect(status().is3xxRedirection())
        .andExpect(redirectedUrl("http://localhost:5002"));
  }
}
