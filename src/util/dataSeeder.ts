import bcrypt from "bcrypt";
import dotenvFlow from "dotenv-flow";


import { eventModel } from "../models/eventModel"; 
import { userModel } from "../models/userModel"; 
import { connect, disconnect } from "../repository/database";

// Load environment variables
dotenvFlow.config();

/**
 * Executes the seeding process, connecting to the database,
 * clearing existing data, and inserting fresh seed data.
 */
export async function seed() {
  try {
    await connect();
    console.log("Database connection established...");

    await deleteAllData();
    await seedData();

    console.log("Seeding process completed successfully.");
    process.exit();
  } catch (err) {
    console.error("Error during seeding process:", err);
  } finally {
    await disconnect();
  }
}

/**
 * Deletes all existing records from the database to ensure
 * a clean slate before inserting new seed data.
 */
export async function deleteAllData() {
  await eventModel.deleteMany();
  await userModel.deleteMany();
  console.log("Previous records deleted successfully.");
}

/**
 * Populates the database with sample users and events.
 */
export async function seedData() {
  // Generate a secure password hash for all users
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("SecurePass123", saltRounds);

  // Create sample users with unique names and emails
  const user1 = new userModel({
    name: "Sophie New",
    email: "sophie.new@gmail.com",
    password: passwordHash,
  });
  await user1.save();

  const user2 = new userModel({
    name: "Liam Brown",
    email: "liam.brown@gmail.com",
    password: passwordHash,
  });
  await user2.save();

  const user3 = new userModel({
    name: "Oliver Small",
    email: "oliver.small@outlook.com",
    password: passwordHash,
  });
  await user3.save();

  // Sample event data with various categories
  const events = [
    {
      title: "Sunrise Yoga in the Park",
      date: new Date("2024-06-15"),
      time: "06:30 AM",
      place: "Central Park, Aarhus",
      eventType: "Active",
      imageURL: "https://picsum.photos/500/500",
      description:
        "Join us for a peaceful early morning yoga session surrounded by nature.",
      _createdBy: user1.id,
    },
    {
      title: "Watercolor Painting Class",
      date: new Date("2024-07-20"),
      time: "02:00 PM",
      place: "Copenhagen Art Center",
      eventType: "Creative",
      imageURL: "https://picsum.photos/500/500",
      description:
        "Discover the beauty of watercolor painting with hands-on guidance from professionals.",
      _createdBy: user1.id,
    },
    {
      title: "Professional Networking Night",
      date: new Date("2024-08-05"),
      time: "06:00 PM",
      place: "Copenhagen Business Hub",
      eventType: "Social",
      imageURL: "https://picsum.photos/500/500",
      description:
        "Connect with industry leaders and expand your professional network over drinks.",
      _createdBy: user2.id,
    },
    {
      title: "Charity Gala Dinner",
      date: new Date("2024-09-12"),
      time: "07:30 PM",
      place: "Royal Hall, Odense",
      eventType: "Special",
      imageURL: "https://picsum.photos/500/500",
      description:
        "An exclusive evening of fine dining and entertainment in support of a great cause.",
      _createdBy: user2.id,
    },
    {
      title: "Weekend Tennis Tournament",
      date: new Date("2024-10-10"),
      time: "10:00 AM",
      place: "Aalborg Tennis Club",
      eventType: "Sport",
      imageURL: "https://picsum.photos/500/500",
      description:
        "Compete or watch some exciting tennis matches at our annual weekend tournament.",
      _createdBy: user3.id,
    },
  ];

  await eventModel.insertMany(events);

  console.log("Sample users and events inserted successfully.");
}

// Initiates the seeding process
seed();
