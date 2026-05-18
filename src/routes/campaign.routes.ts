import { Router } from "express";
import { create, findAll, remove, update } from "../controllers/campaign.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Campaign management endpoints
 */

/**
 * @swagger
 * /campaigns:
 *   post:
 *     summary: Create a new campaign
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CampaignInput'
 *     responses:
 *       201:
 *         description: Campaign created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, create)

/**
 * @swagger
 * /campaigns:
 *   get:
 *     summary: Get all campaigns
 *     tags: [Campaigns]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Items per page
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword
 *       - in: query
 *         name: ownerId
 *         schema:
 *           type: number
 *         description: Filter by owner ID
 *     responses:
 *       200:
 *         description: Campaign list
 */
router.get("/", findAll)

/**
 * @swagger
 * /campaigns/{id}:
 *   put:
 *     summary: Update a campaign
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Campaign ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CampaignInput'
 *     responses:
 *       200:
 *         description: Campaign updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Campaign not found
 */
router.put("/:id", authMiddleware, update)

/**
 * @swagger
 * /campaigns/{id}:
 *   delete:
 *     summary: Delete a campaign
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Campaign deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Campaign not found
 */
router.delete("/:id", authMiddleware, remove)

export default router
