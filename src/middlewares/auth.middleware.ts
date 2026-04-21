import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { prisma } from "../utils/prisma"
import { AppError } from "../utils/app-error"

interface JwtPayload {
  userId: number
}

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("token not provided", 401)
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!user) {
      throw new AppError("user not found", 401)
    }

    // 🔥 INI KUNCI
    req.user = user

    next()
  } catch {
    throw new AppError("invalid token", 401)
  }
}