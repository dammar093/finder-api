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
 *             type: object
 *             required:
 *               - email
 *               - fullName
 *               - phoneNumber
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: dammarrana0931@gmail.com
 *               fullName:
 *                 type: string
 *                 example: Dammar Singh Rana
 *               phoneNumber:
 *                 type: string
 *                 example: +1234567890
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   default: 201
 *                 data:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error

 */
router.post("/", createUser);
/**
 * @openapi
 * /api/v1/users/sign-in:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: dammarrana0931@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   default: 200
 *                 data:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error

 */
router.post("/sign-in", signIn);
router.get("/", verifyJwtToken, loggedInUser);
router.post("/forgot-password", forgotPassword)
router.post("/verify-otp", verifyOTP)
router.post("/reset-password", resetPassword)
export default router