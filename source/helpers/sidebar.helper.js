const Stats = require("./stats.helper");
const Images = require("./images.helper");
const Comments = require("./comments.helper");

module.exports = async (viewModel) => {
	const results = await Promise.all([
		Stats.getStats(),
		Images.getPopularImages(6),
		Comments.getNewestComments(4),
	]);
	viewModel.sidebar = {
		stats: results[0],
		popularImages: results[1],
		newestComments: results[2],
	};
	return viewModel;
};
