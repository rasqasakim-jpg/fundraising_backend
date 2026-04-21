import { AppError } from "../utils/app-error"
import { prisma } from "../utils/prisma"

type CreateDonationInput = {
    amount: number
    userId: number
    campaignId: number
}

export const createDonation = async (data: CreateDonationInput) => {
    if (data.amount <= 0) {
        throw new AppError ("donation amount be greater than 0", 400)
    }

    const campaign = await prisma.campaign.findUnique({
        where: { id: data.campaignId }
    })

    if (!campaign) {
        throw new AppError ("campaign not found", 404)
    }

    if (campaign.ownerId === data.userId) {
        throw new AppError ("cannot donate to your own campaign", 403)
    }

    return prisma.$transaction(async (tx) => {
        const donation = await tx.donation.create({
            data: {
                amount: data.amount,
                userId: data.userId,
                campaignId: data.campaignId
            }
        })

        await tx.campaign.update({
            where: { id: data.campaignId },
            data: {
                currentAmount: {
                    increment: data.amount
                }
            }
        })

        return donation
    })
}