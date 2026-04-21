import { Router } from "express";
import { create, findAll, remove, update } from "../controllers/campaign.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.post("/", authMiddleware, create)
router.get("/", findAll)
router.put("/:id", authMiddleware, update)
router.delete("/:id", authMiddleware, remove)

export default router