export interface Campaign {
    id: number
    title: string
    description: string
    targetAmount: number
    currentAmount: number
    ownerId: number
}

export const campaigns: Campaign[] = []