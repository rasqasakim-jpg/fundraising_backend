import { Router } from "express"
import authRoutes from "./auth.routes"
import campaignRoutes from "./campaign.routes"
import donationRoutes from "./donation.route"

const router = Router()

router.use("/auth", authRoutes)
router.use("/campaigns", campaignRoutes)
router.use("/donations", donationRoutes)

export default router