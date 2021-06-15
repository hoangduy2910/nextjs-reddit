import express from "express";

import user from "../middlewares/user";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/community-controller";

const router = express.Router();
router.use(user);

// Public Routes

// Auth Routes
router.use(auth);
router.post("/", validation.createCommunity(), controller.createCommunity);

export default router;
