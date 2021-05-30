const express = require("express");

const controller = require("../controllers/user");
const auth = require("../middlewares/authentication");

const router = express.Router();

// Public Routes
router.post("/login", controller.login);
router.post("/register", controller.createUser);
router.get("/:id", controller.getUserById);

// Auth Routes
router.get("/update", auth, controller.updateUser);

module.exports = router;
