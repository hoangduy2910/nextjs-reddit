import express from "express";

import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/post";

const router = express.Router();

// Public Routes

// Auth Routes
router.use(auth);
router.post("/", validation.createPost(), controller.createPost);
router.patch("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

export default router;
