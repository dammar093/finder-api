"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../utils/auth"));
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
router.post("/", auth_1.default, category_controller_1.createCategory);
router.patch("/:id", auth_1.default, category_controller_1.updateCategory);
router.get("/", auth_1.default, category_controller_1.getCategories);
exports.default = router;
