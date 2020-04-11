import {Host} from "../../DB/modelsSingleton.js";

let count = 0;

function getCount() {
	count += 1;
	return count;
}

export default class HostFixtures {
	static async host(oauthId = null) {
		const name = `name${getCount()}`;
		const image = `image${getCount()}`;
		const email = `email${getCount()}`;

		return Host.findOrCreatByOAuth({oauthId, name, image, email});
	}
}
