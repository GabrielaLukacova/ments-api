const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Moje API",
      version: "1.0.0",
      description: "API dokumentácia",
    },
  },
  apis: ["./routes.ts"], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}