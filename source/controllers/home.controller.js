const { ImageModel } = require("../models/index.model");

const sidebarHelper = require("../helpers/sidebar.helper");
const { multipleMongooseToObj } = require("../helpers/mongoose.helper");

const controller = {
	async index(req, res) {
		let viewModel = { images: [] };
		viewModel.images = multipleMongooseToObj(
			await ImageModel.find().sort({ timestamp: -1 })
		);
		viewModel = await sidebarHelper(viewModel);
		res.render("index", viewModel);
	},
};

module.exports = controller;
