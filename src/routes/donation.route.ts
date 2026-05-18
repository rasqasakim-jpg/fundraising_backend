import { Router } from "express";
import { donate } from "../controllers/donation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Donation endpoints
 */

/**
 * @swagger
 * /donations/campaigns/{campaignId}/donate:
 *   post:
 *     summary: Donate to a campaign
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: campaignId
 *         required: true
 *         schema:
 *           type: number
 *         description: Campaign ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DonationInput'
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Campaign not found
 */
router.post(
    "/campaigns/:campaignId/donate",
    authMiddleware,
    donate
)

export default router
