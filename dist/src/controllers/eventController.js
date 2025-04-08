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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.getEventsByQuery = getEventsByQuery;
exports.updateEventById = updateEventById;
exports.deleteEventById = deleteEventById;
const eventModel_1 = require("../models/eventModel");
const database_1 = require("../repository/database");
/**
 * Creates a new event in the database based on the request body
 * @param req - The request object containing the event data
 * @param res - The response object to send the result or error
 */
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventData = req.body;
        try {
            // Connect to the database
            yield (0, database_1.connect)();
            // Create a new event instance with the provided data
            const event = new eventModel_1.eventModel(eventData);
            const result = yield event.save();
            // Send the created event as a response
            res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send("An error occurred while creating the event. Error: " + err);
        }
        finally {
            // Disconnect from the database after the operation
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Retrieves all events from the database
 * @param req - The request object
 * @param res - The response object to send the events or error
 */
function getAllEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the database
            yield (0, database_1.connect)();
            // Retrieve all events
            const result = yield eventModel_1.eventModel.find({});
            // Send the list of events as a response
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send("An error occurred while retrieving events. Error: " + err);
        }
        finally {
            // Disconnect from the database
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Retrieves a specific event by its ID from the database
 * @param req - The request object containing the event ID as a URL parameter
 * @param res - The response object to send the event or error
 */
function getEventById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the database
            yield (0, database_1.connect)();
            // Retrieve the event by its ID from the URL parameter
            const eventId = req.params.id;
            const result = yield eventModel_1.eventModel.findById(eventId);
            // If the event is found, send it as a response, otherwise send a 404 error
            if (result) {
                res.status(200).send(result);
            }
            else {
                res.status(404).send("Event not found with the provided ID.");
            }
        }
        catch (err) {
            res.status(500).send("An error occurred while retrieving the event. Error: " + err);
        }
        finally {
            // Disconnect from the database
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Retrieves events that match a specific query from the database
 * @param req - The request object containing the query parameters (key and value)
 * @param res - The response object to send the filtered events or error
 */
function getEventsByQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = req.params.key;
        const value = req.params.val;
        try {
            // Connect to the database
            yield (0, database_1.connect)();
            // Search for events using a regular expression to match the specified query
            const result = yield eventModel_1.eventModel.find({ [key]: { $regex: value, $options: 'i' } });
            // Send the filtered events as a response
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send("An error occurred while retrieving events. Error: " + err);
        }
        finally {
            // Disconnect from the database
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Updates an event based on its ID with the new data from the request body
 * @param req - The request object containing the event ID and new data
 * @param res - The response object to send the result or error
 */
function updateEventById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventId = req.params.id;
        try {
            // Connect to the database
            yield (0, database_1.connect)();
            // Update the event by its ID
            const result = yield eventModel_1.eventModel.findByIdAndUpdate(eventId, req.body, { new: true });
            // If the event is found and updated, send a success message, else send a 404 error
            if (result) {
                res.status(200).send("Event successfully updated.");
            }
            else {
                res.status(404).send(`Event with ID=${eventId} not found.`);
            }
        }
        catch (err) {
            res.status(500).send("An error occurred while updating the event. Error: " + err);
        }
        finally {
            // Disconnect from the database
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Deletes an event by its ID from the database
 * @param req - The request object containing the event ID
 * @param res - The response object to send the result or error
 */
function deleteEventById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventId = req.params.id;
        try {
            // Connect to the database
            yield (0, database_1.connect)();
            // Delete the event by its ID
            const result = yield eventModel_1.eventModel.findByIdAndDelete(eventId);
            // If the event is found and deleted, send a success message, else send a 404 error
            if (result) {
                res.status(200).send("Event successfully deleted.");
            }
            else {
                res.status(404).send(`Event with ID=${eventId} not found.`);
            }
        }
        catch (err) {
            res.status(500).send("An error occurred while deleting the event. Error: " + err);
        }
        finally {
            // Disconnect from the database
            yield (0, database_1.disconnect)();
        }
    });
}
//# sourceMappingURL=eventController.js.map