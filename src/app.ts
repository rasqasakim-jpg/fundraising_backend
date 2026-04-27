import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import routes from "./routes"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./docs/swagger"
import { authMiddleware } from "./middlewares/auth.middleware"
import { errorMidleware } from "./middlewares/error.middleware"

console.log("JWT_SECRET", process.env.JWT_SECRET);

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(errorMidleware)

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile accessed",
    user: req.user
  })
})

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Server running"
  })
})

export default app