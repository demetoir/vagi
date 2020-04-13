import faker from "faker";
import Adjectives from "./Adjective.js";
import Animals from "./Animals.js";

export default class RandomNameGenerator {
	static generate() {
		const adjective = faker.random.arrayElement(Adjectives);
		const animal = faker.random.arrayElement(Animals);

		return `${adjective} ${animal}`;
	}
}
