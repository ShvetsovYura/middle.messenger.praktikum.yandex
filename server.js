const express = require("express");

const app = express();

// const file = "src/index.html";

// const bundler = new Bundler(file, {});
app.use(express.static("public"));
app.use(express.static('dist'));
// app.use(bundler.middleware());

app.listen(3000, function () {
  console.log("server start");
});
