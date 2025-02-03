import { Router, Request, Response } from "express";
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
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
