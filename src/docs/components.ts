export const swaggerComponents = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      RegisterInput: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" }
        }
      },
      Campaign: {
        type: "object",
        properties: {
          id: { type: "number" },
          title: { type: "string" },
          description: { type: "string" },
          targetAmount: { type: "number" },
          currentAmount: { type: "number" }
        }
      }
    }
  }
}