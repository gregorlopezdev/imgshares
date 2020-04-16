const mongoose = require("mongoose");
const key = require("./key");

mongoose
	.connect(key.database.url, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then((db) => console.log("DB is connected"))
	.catch((err) => console.log(err));
