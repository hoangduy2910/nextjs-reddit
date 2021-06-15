import express from "express";

import user from "../middlewares/user";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/comment-controller";

const router = express.Router();
router.use(user);

// Public Routes
router.get("/:identifier/:slug", controller.getComments);

// Auth Routes
router.use(auth);
router.post(
  "/:identifier/:slug",
  validation.createComment(),
  controller.createComment
);

export default router;
