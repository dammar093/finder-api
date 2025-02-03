"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = __importDefault(require("../utils/auth"));
const router = express_1.default.Router();
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
router.post("/", user_controller_1.createUser);
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
router.post("/sign-in", user_controller_1.signIn);
router.get("/", auth_1.default, user_controller_1.loggedInUser);
router.post("/forgot-password", user_controller_1.forgotPassword);
router.post("/verify-otp", user_controller_1.verifyOTP);
router.post("/reset-password", user_controller_1.resetPassword);
exports.default = router;
