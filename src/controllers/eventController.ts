import { Request, Response } from 'express';
import { eventModel } from '../models/eventModel';
import { connect, disconnect } from '../repository/database';

/**
 * Creates a new event in the database based on the request body
 * @param req - The request object containing the event data
 * @param res - The response object to send the result or error
 */
export async function createEvent(req: Request, res: Response): Promise<void> {

  const eventData = req.body;

  try {
    // Connect to the database
    await connect();

    // Create a new event instance with the provided data
    const event = new eventModel(eventData);
    const result = await event.save();

    // Send the created event as a response
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("An error occurred while creating the event. Error: " + err);
  } finally {
    // Disconnect from the database after the operation
    await disconnect();
  }
}

/**
 * Retrieves all events from the database
 * @param req - The request object
 * @param res - The response object to send the events or error
 */
export async function getAllEvents(req: Request, res: Response): Promise<void> {

  try {
    // Connect to the database
    await connect();

    // Retrieve all events
    const result = await eventModel.find({});

    // Send the list of events as a response
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving events. Error: " + err);
  } finally {
    // Disconnect from the database
    await disconnect();
  }
}

/**
 * Retrieves a specific event by its ID from the database
 * @param req - The request object containing the event ID as a URL parameter
 * @param res - The response object to send the event or error
 */
export async function getEventById(req: Request, res: Response): Promise<void> {

  try {
    // Connect to the database
    await connect();

    // Retrieve the event by its ID from the URL parameter
    const eventId = req.params.id;
    const result = await eventModel.findById(eventId);

    // If the event is found, send it as a response, otherwise send a 404 error
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Event not found with the provided ID.");
    }
  } catch (err) {
    res.status(500).send("An error occurred while retrieving the event. Error: " + err);
  } finally {
    // Disconnect from the database
    await disconnect();
  }
}

/**
 * Retrieves events that match a specific query from the database
 * @param req - The request object containing the query parameters (key and value)
 * @param res - The response object to send the filtered events or error
 */
export async function getEventsByQuery(req: Request, res: Response): Promise<void> {

  const key = req.params.key;
  const value = req.params.val;

  try {
    // Connect to the database
    await connect();

    // Search for events using a regular expression to match the specified query
    const result = await eventModel.find({ [key]: { $regex: value, $options: 'i' } });

    // Send the filtered events as a response
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving events. Error: " + err);
  } finally {
    // Disconnect from the database
    await disconnect();
  }
}

/**
 * Updates an event based on its ID with the new data from the request body
 * @param req - The request object containing the event ID and new data
 * @param res - The response object to send the result or error
 */
export async function updateEventById(req: Request, res: Response): Promise<void> {

  const eventId = req.params.id;

  try {
    // Connect to the database
    await connect();

    // Update the event by its ID
    const result = await eventModel.findByIdAndUpdate(eventId, req.body, { new: true });

    // If the event is found and updated, send a success message, else send a 404 error
    if (result) {
      res.status(200).send("Event successfully updated.");
    } else {
      res.status(404).send(`Event with ID=${eventId} not found.`);
    }
  } catch (err) {
    res.status(500).send("An error occurred while updating the event. Error: " + err);
  } finally {
    // Disconnect from the database
    await disconnect();
  }
}

/**
 * Deletes an event by its ID from the database
 * @param req - The request object containing the event ID
 * @param res - The response object to send the result or error
 */
export async function deleteEventById(req: Request, res: Response): Promise<void> {

  const eventId = req.params.id;

  try {
    // Connect to the database
    await connect();

    // Delete the event by its ID
    const result = await eventModel.findByIdAndDelete(eventId);

    // If the event is found and deleted, send a success message, else send a 404 error
    if (result) {
      res.status(200).send("Event successfully deleted.");
    } else {
      res.status(404).send(`Event with ID=${eventId} not found.`);
    }
  } catch (err) {
    res.status(500).send("An error occurred while deleting the event. Error: " + err);
  } finally {
    // Disconnect from the database
    await disconnect();
  }
}
