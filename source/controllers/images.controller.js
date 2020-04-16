const path = require("path");
const fs = require("fs-extra");
const md5 = require("md5");

const { ImageModel, CommentModel } = require("../models/index.model");

const sidebarHelper = require("../helpers/sidebar.helper");
const { buildRandomName } = require("../helpers/libs.helper");
const {
	multipleMongooseToObj,
	mongooseToObj,
} = require("../helpers/mongoose.helper");

const controller = {
	image: async function (req, res) {
		/* INFO(Gregor): { $regex: req.params.imageId }
			Estamos diciendo que busque en el atributo filename una coincidencia con req.params.imageId
		*/
		let viewModel = { image: {} };
		viewModel.image = await ImageModel.findOne({
			filename: {
				$regex: req.params.imageId,
			},
		});
		viewModel.comments = multipleMongooseToObj(
			await CommentModel.find({
				imageId: viewModel.image._id,
			}).sort({
				timestamp: -1,
			})
		);
		viewModel = await sidebarHelper(viewModel);
		if (viewModel.image) {
			viewModel.image.views += 1;
			await viewModel.image.save();
			viewModel.image = mongooseToObj(viewModel.image);
			res.render("image", viewModel);
		} else {
			res.render("notfound", { err: "Not Found Image" });
		}
	},

	async images(req, res) {
		let viewModel = { images: [] };
		viewModel.images = multipleMongooseToObj(
			await ImageModel.find().sort({ timestamp: -1 })
		);
		viewModel = await sidebarHelper(viewModel);
		res.render("images", viewModel);
	},

	create: function (req, res) {
		const saveImage = async () => {
			const image = {};
			image.imageUrl = buildRandomName();
			const savedImages = await ImageModel.find({
				filename: image.imageUrl,
			});

			if (savedImages.length > 0) {
				saveImage();
			} else {
				image.imageExt = path.extname(req.file.originalname).toLowerCase();
				image.imageTempPath = req.file.path;
				image.imageFinalPath = path.resolve(
					`source/public/upload/${image.imageUrl}${image.imageExt}`
				);

				if (
					image.imageExt === ".jpg" ||
					image.imageExt === ".jpeg" ||
					image.imageExt === ".png"
				) {
					await fs.rename(image.imageTempPath, image.imageFinalPath);
					const newImage = new ImageModel({
						title: req.body.title,
						description: req.body.description,
						filename: image.imageUrl + image.imageExt,
					});
					const savedImage = await newImage.save();
					res.redirect(`/images/${image.imageUrl}`);
					// res.send( "work" );
				} else {
					await fs.unlink(image.imageTempPath);
					res.status(500).json({
						error: "Only images are allowed",
					});
				}
			}
		};

		saveImage();
	},

	likes: async function (req, res) {
		const savedImage = await ImageModel.findOne({
			filename: {
				$regex: req.params.imageId,
			},
		});
		if (savedImage) {
			savedImage.likes += 1;
			await savedImage.save();
			res.json({
				likes: savedImage.likes,
			});
		} else {
			res.status(404).json({ err: "Not Found Image" });
		}
	},

	comments: async function (req, res) {
		const savedImage = await ImageModel.findOne({
			filename: {
				$regex: req.params.imageId,
			},
		});

		if (savedImage) {
			const newComment = new CommentModel(req.body);
			newComment.gravatar = md5(newComment.email);
			newComment.imageId = savedImage._id;
			await newComment.save();
			res.redirect(`/images/${savedImage.uniqueId}`);
		} else {
			res.render("notfound", { err: "Not Found Image For Comment" });
		}
	},

	delete: async function (req, res) {
		const savedImage = await ImageModel.findOne({
			filename: {
				$regex: req.params.imageId,
			},
		});
		if (savedImage) {
			await fs.unlink(`./source/public/upload/${savedImage.filename}`);
			await CommentModel.deleteOne({ imageId: savedImage._id });
			await savedImage.remove();
			res.json({ deleted: true });
		} else {
			res.render("notfound", { err: "Not Found Image For Delete" });
		}
	},
};

module.exports = controller;
