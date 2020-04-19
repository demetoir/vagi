export default class AbstractModelQuery {
	/**
	 *
	 * @param models {sequelize.Models}
	 */
	constructor(models) {
		this.models = models;
	}
}
