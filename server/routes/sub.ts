import express from "express";

import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import controller from "../controllers/sub";

const router = express.Router();

router.use(auth);
router.post("/", validation.createSub(), controller.createSub);

export default router;
