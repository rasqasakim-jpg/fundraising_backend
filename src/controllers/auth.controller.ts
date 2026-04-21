import { Request, Response } from "express"
import { loginUser } from "../services/auth.service"
import { registerUser } from "../services/auth.service"

export const login = async (req: Request, res: Response) => {
  const email = req.body.email
  const password = req.body.password

  const result = await loginUser(email, password)

  res.status(200).json({
    message: "login success",
    data: result
  })
}

export const register = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "name, email and password required"
        })
    }

    const user = await registerUser({ name, email, password })

   res.status(201).json({
    message: "user register successfully",
    data: user
   })
  } catch (error: any) {
    res.status(400).json({
        message: error.message
    })
  }
}