const express = require("express");

const app = express();

app.use(express.static('dist'))

app.use(express.static('dist'));

app.listen(3000, function () {
  console.log("server start");
});
