const Bundler = require("parcel-bundler");
const express = require("express");

const app = express();

const file = "src/index.html";

const bundler = new Bundler(file, {});
app.use(express.static("public"));
app.use(bundler.middleware());

app.listen(3000);
