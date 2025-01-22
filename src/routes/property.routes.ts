import { Router } from "express";
import verifyJwtToken from "../utils/auth";
import { upload } from "../utils/multer";
import { createProperty, getProperties, getProperty } from "../controllers/property.controller";

const router = Router();
router.post("/", verifyJwtToken, upload.array("image", 5), createProperty);
router.get("/", verifyJwtToken, getProperties);
router.get("/:id", verifyJwtToken, getProperty);

export default router;