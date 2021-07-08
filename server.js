const express = require("express");

const app = express();

// const file = "src/index.html";

// app.use(express.static("public"));
app.use(express.static('dist'))
// app.use(bundler.middleware());

app.listen(3000);
