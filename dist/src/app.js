"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
const database_1 = require("./repository/database");
const routes_1 = __importDefault(require("./routes"));
const documentation_1 = require("./util/documentation");
const cors_1 = __importDefault(require("cors"));
dotenv_flow_1.default.config();
// Create Express application
const app = (0, express_1.default)();
/**
 * Setup CORS handling to allow cross-origin requests
 */
function setupCors() {
    app.use((0, cors_1.default)({
        origin: "*", // Allow requests from any origin
        methods: 'GET, PUT, POST, DELETE', // Allowed HTTP methods
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allowed headers
        credentials: true // Allow credentials
    }));
}
/**
 * Start the Express server
 */
function startServer() {
    setupCors();
    // Middleware to parse JSON bodies
    app.use(express_1.default.json());
    // Bind event-related routes to the app
    app.use('/api', routes_1.default);
    // Set up API documentation
    (0, documentation_1.setupDocs)(app);
    // Test database connection
    (0, database_1.testConnection)();
    // Start the server
    const PORT = parseInt(process.env.PORT) || 4000;
    app.listen(PORT, () => {
        console.log(`Server is up and running on port: ${PORT}`);
    });
}
//# sourceMappingURL=app.js.map