import { Router } from "express";
import verifyJwtToken from "../utils/auth";
import { createCategory, updateCategory } from "../controllers/category.controller";

const router = Router();
router.post("/", verifyJwtToken, createCategory);
router.patch("/:id", verifyJwtToken, updateCategory);
router.get("/", verifyJwtToken, updateCategory);

export default router;