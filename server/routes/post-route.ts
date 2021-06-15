import express from "express";

import user from "../middlewares/user";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/post-controller";

const router = express.Router();
router.use(user);

// Public Routes
router.get("/", controller.getPosts);
router.get("/:identifier/:slug", controller.getPost);

// Auth Routes
router.use(auth);
router.post("/", validation.createPost(), controller.createPost);

export default router;
