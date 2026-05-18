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
      },
      CampaignInput: {
        type: "object",
        required: ["title", "description", "targetAmount"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          targetAmount: { type: "number" }
        }
      },
      Donation: {
        type: "object",
        properties: {
          id: { type: "number" },
          amount: { type: "number" },
          userId: { type: "number" },
          campaignId: { type: "number" },
          createdAt: { type: "string", format: "date-time" }
        }
      },
      DonationInput: {
        type: "object",
        required: ["amount"],
        properties: {
          amount: { type: "number" }
        }
      }
    }
  }
}
