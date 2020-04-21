const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const CommentSchema = new Schema(
	{
		name: { type: String },
		email: { type: String },
		comment: { type: String },
		gravatar: { type: String },
		imageId: { type: ObjectId },
		timestamp: { type: Date, default: Date.now },
	},
	{
		toObject: {
			virtuals: true,
		},
		toJSON: {
			virtuals: true,
		},
	}
);

// CommentSchema.virtual("uniqueId").get(function () {
// 	return this.filename.replace(path.extname(this.filename), "");
// });

module.exports = mongoose.model("Comment", CommentSchema);
