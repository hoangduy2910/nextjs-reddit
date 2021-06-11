import express from "express";

import auth from "../middlewares/auth";
import controller from "../controllers/vote-controller";

const router = express.Router();

// Auth Routes
router.use(auth);
router.post("/vote", controller.vote);

export default router;
