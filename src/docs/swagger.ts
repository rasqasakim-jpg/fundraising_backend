import swaggerJsdoc from "swagger-jsdoc"
import { swaggerComponents } from "./components"

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fundraising API",
      version: "1.0.0"
    },
    servers: [{ url: "http://localhost:3000" }],
    ...swaggerComponents
  },
  apis: ["./src/routes/*.ts"]
})