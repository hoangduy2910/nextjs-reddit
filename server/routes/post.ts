import express from "express";

import auth from "../middlewares/auth";
import controller from "../controllers/post";

const router = express.Router();

// Public Routes

// Auth Routes
router.post("/", auth, controller.createPost);
router.patch("/:id", auth, controller.updatePost);
router.delete("/:id", auth, controller.deletePost);

export default router;
