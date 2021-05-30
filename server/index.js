const next = require("next");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const trim = require("./middlewares/trim");

const userRoutes = require("./routes/user");

const server = express();
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin@cluster0.po6sj.mongodb.net/nextjs-reddit?retryWrites=true&w=majority";

app
  .prepare()
  .then(() => {
    // Parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }));

    // Parse application/json
    server.use(bodyParser.json());

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
