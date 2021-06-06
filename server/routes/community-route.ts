import express from "express";

import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/community-controller";

const router = express.Router();

// Public Routes

// Auth Routes
router.use(auth);
router.post("/", validation.createCommunity(), controller.createCommunity);

export default router;
