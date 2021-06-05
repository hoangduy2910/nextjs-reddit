import express from "express";

import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/user";

const router = express.Router();

// Public Routes
router.post("/login", validation.login(), controller.login);
router.post("/register", validation.register(), controller.createUser);
// router.get("/:id", controller.getUserById);

// Auth Routes
router.get("/logout", auth, controller.logout);
router.patch("/:id", auth, controller.updateUser);
router.get("/profile", auth, controller.getUserProfile);

export default router;
