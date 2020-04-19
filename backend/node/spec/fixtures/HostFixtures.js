import {v4 as uuidv4} from "uuid";
import {createHost} from "../../DB/queries/host.js";

export default class HostFixtures {
	static async host(oauthId = null) {
		const name = `name_${uuidv4().slice(0, 4)}`;
		const image = `image_${uuidv4().slice(0, 4)}`;
		const email = `email_${uuidv4().slice(0, 4)}`;

		return createHost({oauthId, name, image, email});
	}
}
