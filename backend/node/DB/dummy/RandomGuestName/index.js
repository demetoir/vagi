import faker from "faker";
import Adjectives from "./Adjective.js";
import Animals from "./Animals.js";

// todo refactoring to class
// todo refactoring directory
function getRandomGuestName() {
	const adjective = faker.random.arrayElement(Adjectives);
	const animal = faker.random.arrayElement(Animals);

	return `${adjective} ${animal}`;
}

export default getRandomGuestName;
