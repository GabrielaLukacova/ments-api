import { Request, Response } from 'express';
import { EventModel } from '../models/eventModel';
import { connect, disconnect } from '../repository/database';

// CRUD operations: Create, Read, Update, Delete

/**
 * Handles the creation of a new event.
 * Extracts data from the request body, saves it to the database, and returns the created event.
 * @param req - Express request object containing event details in the request body.
 * @param res - Express response object used to return the created event or an error message.
 */
export async function createEvent(req: Request, res: Response): Promise<void> {
    const data = req.body;

    try {
        await connect();

        const event = new EventModel(data);
        const result = await event.save();

        res.status(201).send(result);
    } catch (err) {
        res.status(500).send("Error creating event. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Retrieves all events from the database.
 * Sends back an array of events or an error message if retrieval fails.
 * @param req - Express request object.
 * @param res - Express response object used to return event data or an error message.
 */
export async function getAllEvents(req: Request, res: Response) {
    try {
        await connect();

        const result = await EventModel.find({});

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error retrieving events. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Retrieves a single event by its ID.
 * Sends the event data if found, or an error message if not.
 * @param req - Express request object containing the event ID in the URL parameters.
 * @param res - Express response object used to return the event or an error message.
 */
export async function getEventById(req: Request, res: Response) {
    try {
        await connect();

        const id = req.params.id;
        const result = await EventModel.findById(id);

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error retrieving event by ID. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Searches for events based on a query key and value.
 * Uses case-insensitive regex matching to find relevant events.
 * @param req - Express request object containing query parameters (key and value).
 * @param res - Express response object used to return matching events or an error message.
 */
export async function getEventsByQuery(req: Request, res: Response) {
    const key = req.params.key;
    const val = req.params.val;

    try {
        await connect();

        const result = await EventModel.find({ [key]: { $regex: val, $options: 'i' } });

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error retrieving events based on query. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Updates an event based on its ID.
 * Accepts updated event details in the request body and applies them to the specified event.
 * @param req - Express request object containing the event ID and updated data.
 * @param res - Express response object indicating success or failure of the update.
 */
export async function updateEventById(req: Request, res: Response) {
    const id = req.params.id;

    try {
        await connect();

        const result = await EventModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send('Event with ID=' + id + ' not found. Update failed.');
        } else {
            res.status(200).send('Event successfully updated.');
        }
    } catch (err) {
        res.status(500).send("Error updating event by ID. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Deletes an event by its ID.
 * Removes the event from the database and returns a success or failure message.
 * @param req - Express request object containing the event ID.
 * @param res - Express response object indicating whether the deletion was successful.
 */
export async function deleteEventById(req: Request, res: Response) {
    const id = req.params.id;

    try {
        await connect();

        const result = await EventModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send('Event with ID=' + id + ' not found. Deletion failed.');
        } else {
            res.status(200).send('Event successfully deleted.');
        }
    } catch (err) {
        res.status(500).send("Error deleting event by ID. Details: " + err);
    } finally {
        await disconnect();
    }
}