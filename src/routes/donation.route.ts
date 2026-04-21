import { Router } from "express";
import { donate } from "../controllers/donation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.post(
    "/campaigns/:campaignId/donate",
    authMiddleware,
    donate
)

export default router