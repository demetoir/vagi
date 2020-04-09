import {after, afterEach, before} from "mocha";
import MochaTestHelper from "./MochaTestHelper.js";
import models from "../../DB/models";

export default class SequelizeTestHelper extends MochaTestHelper {
	async setup() {
		this.promise = models.sequelize.sync();

		return this.promise;
	}

	async teardown() {
		return this;
	}

	async dropAllAfterEach() {
		const promiseList = models.modelList.map(async model => {
			model.destroy({
				where: {},
				truncate: true,
			});
		});

		await Promise.all(promiseList);

		return this;
	}

	autoSetup() {
		before(async () => {
			await Promise.all([this.setup()]);
		});

		after(async () => {
			await Promise.all([this.teardown()]);
		});

		afterEach(async () => {
			await this.dropAllAfterEach();
		});

		return this;
	}
}
