import { Router } from "express";
import verifyJwtToken from "../utils/auth";
import { createCategory } from "../controllers/category.controller";

const router = Router();
router.post("/", verifyJwtToken, createCategory);

export default router;