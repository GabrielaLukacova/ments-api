import { createEvent } from "../src/controllers/eventController";
import { Request, Response } from "express";
import { eventModel } from "../src/models/eventModel";

// Mock the eventModel save method to avoid actual database calls
jest.mock('../src/models/eventModel');

describe("createEvent", () => {
  test("should return 201 when event is created successfully", async () => {
    // Arrange
    const req = {
      body: {
        title: "Test Event",
        description: "This is a test event.",
        date: "2025-05-01T10:00:00.000Z",
        location: "Copenhagen"
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (eventModel.prototype.save as jest.Mock).mockResolvedValue({
      _id: "12345",
      title: "Test Event",
      description: "This is a test event.",
      date: "2025-05-01T10:00:00.000Z",
      location: "Copenhagen",
    });

    // Act
    await createEvent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      _id: "12345",
      title: "Test Event",
      description: "This is a test event.",
      date: "2025-05-01T10:00:00.000Z",
      location: "Copenhagen"
    });
  });
});
