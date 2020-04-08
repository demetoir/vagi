import {findOrCreateHostByOAuth} from "../../DB/queries/host.js";

export default class GuestFixtures {
	static async host(oauthId = null) {
		const name = "name";
		const image = "image";
		const email = "email";

		return findOrCreateHostByOAuth({oauthId, name, image, email});
	}
}
