const express = require("express");

const userControllers = require("../controllers/user");

const router = express.Router();
router.get("/login", userControllers.login);
router.post("/register", userControllers.create);
router.get("/:id", userControllers.getById);

module.exports = router;