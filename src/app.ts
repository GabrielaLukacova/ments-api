import express, { Application, Request, Response } from 'express';
import DotenvFlow from 'dotenv-flow';
import routes from './routes';
import {testConnection} from './repository/database';

DotenvFlow.config();

// Create a new express application instance
const app: Application = express();

export function startServer() {

    // JSON body parser
     app.use(express.json());

    app.use('/api', routes); 

testConnection();

    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function() {
        console.log("Server started on port" + PORT);
    });
}