import express from "express";

import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/comment-controller";

const router = express.Router();

// Public Routes

// Auth Routes
router.use(auth);
router.post("/", validation.createComment(), controller.createComment);

export default router;
