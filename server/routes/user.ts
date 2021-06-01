import express from "express";

import controller from "../controllers/user";
import auth from "../middlewares/auth";

const router = express.Router();

// Public Routes
router.post("/login", controller.login);
router.post("/register", controller.createUser);
// router.get("/:id", controller.getUserById);

// Auth Routes
router.get("/logout", auth, controller.logout);
router.patch("/:id", auth, controller.updateUser);
router.get("/profile", auth, controller.getUserProfile);

export default router;
