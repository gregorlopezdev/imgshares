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
	if (result.length) {
		return result[0].allViews;
	} else {
		return result.length;
	}
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
	if (result.length) {
		return result[0].allLikes;
	} else {
		return result.length;
	}
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
