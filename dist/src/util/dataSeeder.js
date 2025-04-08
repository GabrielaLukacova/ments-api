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
exports.seed = seed;
exports.deleteAllData = deleteAllData;
exports.seedData = seedData;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
const eventModel_1 = require("../models/eventModel");
const userModel_1 = require("../models/userModel");
const database_1 = require("../repository/database");
// Load environment variables
dotenv_flow_1.default.config();
/**
 * Executes the seeding process, connecting to the database,
 * clearing existing data, and inserting fresh seed data.
 */
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connect)();
            console.log("Database connection established...");
            yield deleteAllData();
            yield seedData();
            console.log("Seeding process completed successfully.");
            process.exit();
        }
        catch (err) {
            console.error("Error during seeding process:", err);
        }
        finally {
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Deletes all existing records from the database to ensure
 * a clean slate before inserting new seed data.
 */
function deleteAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield eventModel_1.eventModel.deleteMany();
        yield userModel_1.userModel.deleteMany();
        console.log("Previous records deleted successfully.");
    });
}
/**
 * Populates the database with sample users and events.
 */
function seedData() {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate a secure password hash for all users
        const saltRounds = 10;
        const passwordHash = yield bcryptjs_1.default.hash("SecurePass123", saltRounds);
        // Create sample users with unique names and emails
        const user1 = new userModel_1.userModel({
            name: "Sophie New",
            email: "sophie.new@gmail.com",
            password: passwordHash,
        });
        yield user1.save();
        const user2 = new userModel_1.userModel({
            name: "Liam Brown",
            email: "liam.brown@gmail.com",
            password: passwordHash,
        });
        yield user2.save();
        const user3 = new userModel_1.userModel({
            name: "Oliver Small",
            email: "oliver.small@outlook.com",
            password: passwordHash,
        });
        yield user3.save();
        // Sample event data with various categories
        const events = [
            {
                title: "Sunrise Yoga in the Park",
                date: new Date("2024-06-15"),
                time: "06:30 AM",
                place: "Central Park, Aarhus",
                eventType: "Active",
                imageURL: "https://picsum.photos/500/500",
                description: "Join us for a peaceful early morning yoga session surrounded by nature.",
                _createdBy: user1.id,
            },
            {
                title: "Watercolor Painting Class",
                date: new Date("2024-07-20"),
                time: "02:00 PM",
                place: "Copenhagen Art Center",
                eventType: "Creative",
                imageURL: "https://picsum.photos/500/500",
                description: "Discover the beauty of watercolor painting with hands-on guidance from professionals.",
                _createdBy: user1.id,
            },
            {
                title: "Professional Networking Night",
                date: new Date("2024-08-05"),
                time: "06:00 PM",
                place: "Copenhagen Business Hub",
                eventType: "Social",
                imageURL: "https://picsum.photos/500/500",
                description: "Connect with industry leaders and expand your professional network over drinks.",
                _createdBy: user2.id,
            },
            {
                title: "Charity Gala Dinner",
                date: new Date("2024-09-12"),
                time: "07:30 PM",
                place: "Royal Hall, Odense",
                eventType: "Special",
                imageURL: "https://picsum.photos/500/500",
                description: "An exclusive evening of fine dining and entertainment in support of a great cause.",
                _createdBy: user2.id,
            },
            {
                title: "Weekend Tennis Tournament",
                date: new Date("2024-10-10"),
                time: "10:00 AM",
                place: "Aalborg Tennis Club",
                eventType: "Sport",
                imageURL: "https://picsum.photos/500/500",
                description: "Compete or watch some exciting tennis matches at our annual weekend tournament.",
                _createdBy: user3.id,
            },
        ];
        yield eventModel_1.eventModel.insertMany(events);
        console.log("Sample users and events inserted successfully.");
    });
}
// Initiates the seeding process
seed();
//# sourceMappingURL=dataSeeder.js.map