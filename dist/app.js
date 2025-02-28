"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./repository/database");
dotenv_flow_1.default.config();
// Create a new express application instance
const app = (0, express_1.default)();
function startServer() {
    // JSON body parser
    app.use(express_1.default.json());
    app.use('/api', routes_1.default);
    (0, database_1.testConnection)();
    const PORT = parseInt(process.env.PORT) || 4000;
    app.listen(PORT, function () {
        console.log("Server started on port" + PORT);
    });
}
//# sourceMappingURL=app.js.map