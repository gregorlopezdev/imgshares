const { ImageModel, CommentModel } = require("../models/index.model");
const { multipleMongooseToObj, mongooseToObj } = require("./mongoose.helper");

module.exports = {
	async getNewestComments(number) {
		const comments = multipleMongooseToObj(
			await CommentModel.find().limit(number).sort({ timestamp: -1 })
		);
		for (const comment of comments) {
			const image = mongooseToObj(
				await ImageModel.findOne({ _id: comment.imageId })
			);
			comment.image = image;
		}
		return comments;
	},
};
