import express, { Application } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import routes from './routes';
import { setupDocs } from './util/documentation';
import cors from 'cors';

dotenvFlow.config();

// Create Express application
const app: Application = express();

/**
 * Setup CORS handling to allow cross-origin requests
 */
function setupCors() {
    app.use(cors({
        origin: "*", // Allow requests from any origin
        methods: 'GET, PUT, POST, DELETE', // Allowed HTTP methods
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allowed headers
        credentials: true // Allow credentials
    }));
}

/**
 * Start the Express server
 */
export function startServer() {
    setupCors();
    
    // Middleware to parse JSON bodies
    app.use(express.json());

    // Bind event-related routes to the app
    app.use('/api', routes);

    // Set up API documentation
    setupDocs(app);

    // Test database connection
    testConnection();

    // Start the server
    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, () => {
        console.log(`Server is up and running on port: ${PORT}`);
    });
}