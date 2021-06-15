import express from "express";

import user from "../middlewares/user";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/vote-controller";

const router = express.Router();
router.use(user);

// Public Routes

// Auth Routes
router.use(auth);
router.post("/", validation.vote(), controller.vote);

export default router;
