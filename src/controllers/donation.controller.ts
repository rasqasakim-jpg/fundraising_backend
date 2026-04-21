import { Request, Response } from "express"
import { createDonation } from "../services/donation.service"

export const donate = async (req: Request, res: Response) => {
   const { amount }  = req.body
   const campaignId = Number(req.params.campaignId)
   const userId = req.user!.id

   const donation = await createDonation({
      amount: Number(amount),
      userId,
      campaignId
   })
   res.status(201)  .json({
      message: "donation success",
      data: donation
   })
}
