package demetoir.vagi.libs;

import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.assertj.core.api.Java6Assertions.assertThat;

class RandomNameGeneratorTest {
  @Test
  void ableToConstruct() throws IOException {

    RandomNameGenerator randomNameGenerator = new RandomNameGenerator();
  }

  @Test
  void generate_name() throws IOException {
    RandomNameGenerator randomNameGenerator = new RandomNameGenerator();
    var name1 = randomNameGenerator.generate();

    System.out.println(name1);
    assertThat(name1).isNotNull();
  }

  @Test
  void generate_diff_name() throws IOException {
    RandomNameGenerator randomNameGenerator = new RandomNameGenerator();
    var name1 = randomNameGenerator.generate();
    var name2 = randomNameGenerator.generate();

    assertThat(name1).isNotEqualTo(name2);
  }

  @Test
  void readResourceJson() throws IOException {
    RandomNameGenerator randomNameGenerator = new RandomNameGenerator();

    var json = randomNameGenerator.readResourceJson("Adjective.json");

    assertThat(json).isNotNull();
  }
}
