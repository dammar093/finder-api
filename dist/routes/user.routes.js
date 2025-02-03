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
 * /api/v1/user:
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
router.post("/", user_controller_1.createUser);
router.post("/sign-in", user_controller_1.signIn);
router.get("/", auth_1.default, user_controller_1.loggedInUser);
router.post("/forgot-password", user_controller_1.forgotPassword);
router.post("/verify-otp", user_controller_1.verifyOTP);
router.post("/reset-password", user_controller_1.resetPassword);
exports.default = router;
