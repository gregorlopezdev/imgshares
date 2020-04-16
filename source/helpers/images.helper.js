const { ImageModel } = require("../models/index.model");
const { multipleMongooseToObj } = require("./mongoose.helper");

module.exports = {
	async getPopularImages(number) {
		const images = multipleMongooseToObj(
			await ImageModel.find().limit(number).sort({ likes: -1 })
		);
		return images;
	},
};
