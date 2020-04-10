import {Model} from "sequelize";

export default class HostModel extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: DataTypes.INTEGER,
				},
				oauthId: {
					type: DataTypes.STRING(100),
				},
				name: {
					type: DataTypes.STRING(100),
				},
				email: {
					type: DataTypes.STRING(100),
				},
				emailFeedBack: {
					type: DataTypes.BOOLEAN,
				},
				image: {
					type: DataTypes.TEXT,
				},
				createdAt: {
					allowNull: false,
					type: DataTypes.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: DataTypes.DATE,
				},
			},
			{sequelize, tableName: "Hosts"},
		);
	}

	static associate(models) {
		models.Host.hasMany(models.Event);
	}

	/**
	 *
	 * @param oauthId {String}
	 * @returns {Promise<Model<any, any>|any>}
	 */
	static async findByOAuthId(oauthId) {
		let res = await this.findOne({where: {oauthId}});

		if (res !== null) {
			res = res.get({plain: true});
		}

		return res;
	}

	/**
	 *
	 * @param oauthId {string}
	 * @param name {string|undefined}
	 * @param image {string|undefined}
	 * @param email {string|undefined}
	 * @returns {Promise<object>}
	 */
	static async findOrCreatByOAuth({oauthId, name, image, email}) {
		const res = await this.findOrCreate({
			where: {oauthId},
			defaults: {name, image, email, emailFeedBack: false},
		});

		return res[0].get({plain: true});
	}
}
