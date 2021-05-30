const next = require("next");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const trim = require("./middlewares/trim");
const config = require("./config");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const server = express();
const port = process.env.PORT || config.PORT;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const MONGODB_URI = process.env.MONGODB_URI || config.MONGODB_URI;

app
  .prepare()
  .then(() => {
    // Parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }));

    // Parse application/json
    server.use(bodyParser.json());

    // Parse Cookie
    server.use(cookieParser());

    // Allows for cross origin domain request:
    server.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    // Middlewares
    server.use(trim);

    // Routes
    server.use("/api/user", userRoutes);
    server.use("/api/post", postRoutes);

    // MongoDB
    mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((res) => console.log("Connect DB Success !!!"))
      .catch((err) => console.log("Connect DB Fail !!!", err));

    // NextJS Routes
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`App run on http://localhost:${port}/`);
    });
  })
  .catch();
