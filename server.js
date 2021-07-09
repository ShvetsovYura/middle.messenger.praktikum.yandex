const express = require("express");

const app = express();

const PORT = process.env.port || 3000;

app.use(express.static("dist"));

app.listen(PORT);
