import express from "express";

import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/user-controller";

const router = express.Router();

// Public Routes
router.post("/login", validation.login(), controller.login);
router.post("/register", validation.register(), controller.createUser);

// Auth Routes
router.use(auth);
router.get("/logout", controller.logout);
router.patch("/:id", controller.updateUser);
router.get("/profile", controller.getUserProfile);

export default router;
