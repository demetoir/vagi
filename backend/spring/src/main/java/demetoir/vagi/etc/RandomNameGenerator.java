package demetoir.vagi.etc;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class RandomNameGenerator {

  private final List<String> adjectives;
  private final List<String> animals;
  private final Random rand;

  public RandomNameGenerator() throws IOException {
    this.rand = new Random();
    this.adjectives = this.readResourceJson("Adjective.json");
    this.animals = this.readResourceJson("Animals.json");
  }

  public List<String> readResourceJson(String path) throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    ClassPathResource adjResource = new ClassPathResource(path);
    var json = objectMapper.readValue(adjResource.getFile(), String[].class);
    return Arrays.asList(json);
  }

  public String generate() {
    var adjective = this.adjectives.get(this.rand.nextInt(this.adjectives.size()));
    var animal = this.animals.get(this.rand.nextInt(this.adjectives.size()));
    return adjective + " " + animal;
  }
}
