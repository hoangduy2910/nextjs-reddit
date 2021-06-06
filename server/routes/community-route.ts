import express from "express";

import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/community-controller";

const router = express.Router();

router.use(auth);
router.post("/", validation.createCommunity(), controller.createCommunity);

export default router;
