"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Local server",
            },
            {
                url: "https://ments-api-2t08.onrender.com",
                description: "Production server",
            },
        ],
    },
    apis: ["./routes.ts"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
function setupSwagger(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
//# sourceMappingURL=swagger.js.map