"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("./controllers/eventController");
const authController_1 = require("./controllers/authController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - General
 *     summary: API health check
 *     description: Basic endpoint to verify if the API is running.
 *     responses:
 *       200:
 *         description: API is up and running.
 */
router.get('/', (req, res) => {
    res.status(200).send('Welcome to the Events API');
});
// Authentication Routes
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a new user account in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request, validation failed.
 */
router.post('/user/register', authController_1.registerUser);
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticates the user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's registered email.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Login successful, returns token.
 *       401:
 *         description: Unauthorized, incorrect credentials.
 */
router.post('/user/login', authController_1.loginUser);
// Event Routes
/**
 * @swagger
 * /events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     description: Allows authenticated users to create a new event.
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Event"
 *     responses:
 *       201:
 *         description: Event created successfully.
 *       400:
 *         description: Validation error or missing fields.
 */
router.post('/events', authController_1.verifyToken, eventController_1.createEvent);
/**
 * @swagger
 * /events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get all events
 *     description: Retrieves a list of all events available.
 *     responses:
 *       200:
 *         description: A list of events.
 */
router.get('/events', eventController_1.getAllEvents);
/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get a specific event
 *     description: Retrieves details of a specific event by its ID.
 *     parameters:
 *       - in: path
 *         title: id
 *         required: true
 *         description: The unique ID of the event.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details retrieved successfully.
 *       404:
 *         description: Event not found.
 */
router.get('/events/:id', eventController_1.getEventById);
/**
 * @swagger
 * /events/query/{key}/{val}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Search for events by a specific field
 *     description: Retrieves events based on a given key-value pair.
 *     parameters:
 *       - in: path
 *         title: key
 *         required: true
 *         description: The event field to search by (e.g., "place").
 *         schema:
 *           type: string
 *       - in: path
 *         title: val
 *         required: true
 *         description: The value to match.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching events.
 *       404:
 *         description: No events found.
 */
router.get('/events/query/:key/:val', eventController_1.getEventsByQuery);
// Update and Delete Routes
/**
 * @swagger
 * /events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Update an event
 *     description: Updates an event's details based on its ID.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         title: id
 *         required: true
 *         description: The ID of the event to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Event"
 *     responses:
 *       200:
 *         description: Event updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Event not found.
 */
router.put('/events/:id', authController_1.verifyToken, eventController_1.updateEventById);
/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Delete an event
 *     description: Removes an event from the database.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         title: id
 *         required: true
 *         description: The ID of the event to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *       404:
 *         description: Event not found.
 */
router.delete('/events/:id', authController_1.verifyToken, eventController_1.deleteEventById);
exports.default = router;
//# sourceMappingURL=routes.js.map