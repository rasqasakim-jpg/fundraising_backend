import { Query } from "pg"
import { Campaign, campaigns } from "../models/campaign.model"
import { AppError } from "../utils/app-error"
import { prisma } from "../utils/prisma"
import { title } from "node:process"

type CreateCampaignInput = {
  title: string
  description: string
  targetAmount: number
  ownerId: number
}

type UpdateCampaignInput = {
  title?: string
  description?: string
  targetAmount?: number
}

export const updateCampaign = async (
  campaignId: number,
  userId: number,
  data: {
    title?: string
    description?: string
    targetAmount?: number
  }
) => {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId }
  })

  if (!campaign) {
    throw new AppError ("campaign not found", 404)
  }

  if (campaign.ownerId !== userId) {
    throw new AppError ("forbidden", 403)
  }

  return prisma.campaign.update({
    where: { id: campaignId },
    data
  })
}

export const createCampaign = async (data: CreateCampaignInput) => {
  if (!data.title || !data.description || data.targetAmount <= 0) {
    throw new AppError("invalid campaign data", 400)
  }

  return prisma.campaign.create({
    data: {
      title: data.title,
      description: data.description,
      targetAmount: data.targetAmount,
      ownerId: data.ownerId
    }
  })
}

export const getCampaigns = async (query: {
  page?: number
  limit?: number
  q?: string
  ownerId?: number
}) => {
  const page = query.page && query.page > 0 ? query.page : 1
  const limit = query.limit && query.limit > 0 ? query.limit : 10
  const skip = (page - 1) * limit

  const where: any = {}

  if (query.ownerId) {
    where.ownerId = query.ownerId
  }

  if (typeof query.q === "string" && query.q.length > 0) {
    where.OR = [
      {
        title: {
          contains: query.q,
          mode: "insensitive"
        }
      },
      {
        description: {
          contains: query.q,
          mode: "insensitive"
        }
      }
    ]
  }

  const [total, campaigns] = await prisma.$transaction([
    prisma.campaign.count({ where }),
    prisma.campaign.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        owner: {
          select: { id: true, name: true, email: true }
        }
      }
    })
  ])

  return {
    data: campaigns,
    meta: {
      total,
      page,
      limit,
      totalpages: Math.ceil(total / limit)
    }
  }
}

export const deleteCampaign = async (
  campaignId: number,
  userId: number
) => {
 const campaign = await prisma.campaign.findUnique({
  where: { id: campaignId }
 })

 if (!campaign) {
  throw new AppError("campaign not found", 404)
 }

 if (campaign.ownerId !== userId) {
  throw new AppError("forbidden", 403)
 }

 await prisma.campaign.delete({
  where: { id: campaignId }
 })
}