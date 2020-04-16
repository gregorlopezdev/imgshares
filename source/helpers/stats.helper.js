const { ImageModel, CommentModel } = require("../models/index.model");

async function imagesCounter() {
	return await ImageModel.countDocuments();
}
async function commentsCounter() {
	return await CommentModel.countDocuments();
}
async function imagesAllViewsCounter() {
	const result = await ImageModel.aggregate([
		{
			$group: {
				_id: 1,
				allViews: { $sum: "$views" },
			},
		},
	]);
	return result[0].allViews;
}
async function imagesAllLikesCounter() {
	const result = await ImageModel.aggregate([
		{
			$group: {
				_id: 1,
				allLikes: { $sum: "$likes" },
			},
		},
	]);
	return result[0].allLikes;
}

module.exports = {
	async getStats() {
		const results = await Promise.all([
			imagesCounter(),
			commentsCounter(),
			imagesAllViewsCounter(),
			imagesAllLikesCounter(),
		]);
		return {
			images: results[0],
			comments: results[1],
			imagesAllViews: results[2],
			imagesAllLikes: results[3],
		};
	},
};
