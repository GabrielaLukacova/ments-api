"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDocs = setupDocs;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
/**
 * Configures and initializes Swagger documentation for the API.
 * This function sets up the API documentation using OpenAPI 3.0 specifications.
 *
 * @param app - The Express application instance
 */
function setupDocs(app) {
    // Define the general API documentation structure
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Events API',
            version: '1.0.0',
            description: 'API for managing events and user authentication.',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/', // Local development server
                description: 'Local server',
            },
            {
                url: 'https://ments-api-2t08.onrender.com/api/', // Render deployment
                description: 'Online server',
            }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
                /**
                 * Event Schema Definition
                 * Represents an event in the system.
                 */
                Event: {
                    type: 'object',
                    properties: {
                        title: { type: 'string', description: 'Name of event' },
                        date: { type: 'string', format: 'date', description: 'Date when the event takes place' },
                        time: { type: 'string', description: 'Time of the event (HH:MM format)' },
                        place: { type: 'string', description: 'Location of the event' },
                        imageURL: { type: 'string', description: 'URL of the event image' },
                        description: { type: 'string', description: 'Detailed description of the event' },
                        eventType: {
                            type: 'string',
                            enum: ['Active', 'Creative', 'Social', 'Special', 'Sport'],
                            description: 'Type of event (one of: Active, Creative, Social, Special, Sport)'
                        },
                        _createdBy: { type: 'string', description: 'ID of the user who created the event' },
                    },
                },
                /**
                 * User Schema Definition
                 * Represents a registered user in the system.
                 */
                User: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', description: 'Full name of the user' },
                        email: { type: 'string', description: 'Unique email address for the user' },
                        password: { type: 'string', description: 'Hashed password for authentication' },
                        registerDate: { type: 'string', format: 'date-time', description: 'Date when the user registered' },
                    },
                },
            },
        }
    };
    // Configure options for generating Swagger documentation
    const options = {
        swaggerDefinition,
        apis: ['**/*.ts'], // Path pattern to include all TypeScript files with Swagger comments
    };
    // Generate the Swagger specification based on the configuration
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    // Serve the API documentation at /api/docs
    app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
//# sourceMappingURL=documentation.js.map