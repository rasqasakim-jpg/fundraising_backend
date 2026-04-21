import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma";
import jwt from "jsonwebtoken"
import { AppError } from "../utils/app-error";

type RegisterInput = {
    name: string
    email: string
    password: string
}

type LoginResponse = {
     token: string
     user: {
        id: number
        email: string
        name: string
     }
}

export const loginUser = async (
    email: string,
    password: string
): Promise<LoginResponse> => {

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new AppError("invalid email or password", 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new AppError ("invalid email or password", 401)
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    )

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

const generateToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    }) 
}

export const registerUser = async (
    data: RegisterInput
) => {
    const exisitingUser = await prisma.user.findUnique({
        where: { email: data.email }
    })

    if (exisitingUser) {
        throw new AppError("email already register", 400)
    }

    const hashesdPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashesdPassword
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    return user
}
