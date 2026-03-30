import { Router } from "express";
import { shortUrlController, redirectUrlController, getUrlAnalyticsController } from "../controllers/urlControllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

//Middleware
router.use(authMiddleware)

router.post('/shorten', shortUrlController);
router.get("/:code", redirectUrlController);
router.get("/analytics/:code", getUrlAnalyticsController);

export default router;