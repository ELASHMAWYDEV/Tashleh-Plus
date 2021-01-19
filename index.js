require("dotenv/config");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { checkToken } = require("./helpers/jwt");
const PORT = process.env.PORT || 5005;

//init
require("./db");

//Middlewares
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//For the react app
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api", checkToken, require("./api/index"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
