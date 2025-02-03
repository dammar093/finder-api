import express from "express";
import { createUser, forgotPassword, loggedInUser, resetPassword, signIn, verifyOTP } from "../controllers/user.controller";
import verifyJwtToken from "../utils/auth";
const router = express.Router();

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 */
router.post("/", createUser);
router.post("/sign-in", signIn);
router.get("/", verifyJwtToken, loggedInUser);
router.post("/forgot-password", forgotPassword)
router.post("/verify-otp", verifyOTP)
router.post("/reset-password", resetPassword)
export default router