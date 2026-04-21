export interface Donation {
    id: number
    amount: number
    campaignId: number
    userId: number
}

export const donations: Donation[] = []