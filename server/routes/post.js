const express = require("express");

const auth = require("../middlewares/authentication");
const controller = require("../controllers/post");

const router = express.Router();

// Public Routes

// Auth Routes
router.post("/create", auth, controller.createPost);
router.post("/update", auth, controller.updatePost);
router.post("/delete", auth, controller.deletePost);

module.exports = router;
