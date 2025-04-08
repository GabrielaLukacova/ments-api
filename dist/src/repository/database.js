"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
exports.disconnect = disconnect;
exports.testConnection = testConnection;
const mongoose_1 = __importDefault(require("mongoose"));
/* Connect to the database */
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!process.env.DBHOST) {
                throw new Error('DBHOST environment variable is not defined');
            }
            yield mongoose_1.default.connect(process.env.DBHOST);
            // ping the server to check if we have a connection
            if (mongoose_1.default.connection.db) {
                yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
                console.log('Connection established');
            }
            else {
                throw new Error('Database connection is not established');
            }
        }
        catch (error) {
            console.log('Error connecting to the database. Error: ' + error);
        }
    });
}
/* Disconnect from the database */
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.disconnect();
            console.log('Connection closed');
        }
        catch (error) {
            console.log('Error closing database connection. Error: ' + error);
        }
    });
}
/* Test db connection */
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect();
            yield disconnect();
            console.log('Database connection test completed (connect + disconnect)');
        }
        catch (error) {
            console.log('Error testing database connection. Error: ' + error);
        }
    });
}
//# sourceMappingURL=database.js.map