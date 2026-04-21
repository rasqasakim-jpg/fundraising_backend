import { Request, Response } from "express";
import { createCampaign, deleteCampaign, getCampaigns, updateCampaign } from "../services/campaign.service";
import { AppError } from "../utils/app-error";

export const update = async (req: Request, res: Response) => {
        const campaignId = Number(req.params.id)
        const userId = req.user!.id

        const campaign = updateCampaign(campaignId, userId, req.body)

        res.json({
            message: "campaign update",
            data: campaign
        })
}

export const create = async (req: Request, res: Response) => {
        const { title, description, targetAmount } = req.body

        if (!title || !description || !targetAmount) {
            throw new AppError ("all field required", 400)
        }

        const campaign = await createCampaign({
            title,
            description,
            targetAmount: Number(targetAmount),
            ownerId: req.user!.id
        })

        res.status(201).json({
            message: "campaign create",
            data: campaign
        })
}

export const findAll = async (req: Request, res: Response) => {
    const { page, limit, q, ownerId } = req.query

    const parsedOwnerId = 
      typeof ownerId === "string" && !isNaN(Number(ownerId))
      ? Number(ownerId)
      : undefined

      const parsedQ = 
        typeof q === "string" && q.trim().length > 0
          ? q.trim()
          : undefined

    const result = await getCampaigns({
        page: page && !isNaN(Number(page)) ? Number(page) : undefined,
        limit: limit && !isNaN(Number(limit)) ? Number(limit) : undefined,
        q: parsedQ,
        ownerId: parsedOwnerId
    })

    res.json(result)
}

export const remove = async (req: Request, res: Response) => {
    const campaignId = Number(req.params.id)
    const userId = req.user!.id

    deleteCampaign(campaignId, userId)

    res.json({
      message: "campaign deleted"
    })
}