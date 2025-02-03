"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * @openapi
 * /healthcheck:
 *   get:
 *     tags:
 *       - Healthcheck
 *     description: Response if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.sendStatus(200);
});
exports.default = router;
