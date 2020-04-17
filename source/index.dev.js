const express = require("express");
const configDev = require("./server/config.dev");

require("./database");
const app = configDev(express());

app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
});
