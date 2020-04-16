const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home.controller");
const imagesController = require("../controllers/images.controller");

module.exports = (app) => {
	router.get("/", homeController.index);
	router.get("/images/:imageId", imagesController.image);
	router.get("/images", imagesController.images);
	router.post("/images", imagesController.create);
	router.post("/images/:imageId/likes", imagesController.likes);
	router.post("/images/:imageId/comments", imagesController.comments);
	router.delete("/images/:imageId", imagesController.delete);

	app.use(router);
};
