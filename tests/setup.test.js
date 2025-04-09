process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import { eventModel } from '../src/models/eventModel';
import { userModel } from '../src/models/userModel';

// Clean up the database before each test
beforeEach(async () => {
    await eventModel.deleteMany({});
    await userModel.deleteMany({});
});

// Clean up the database after each test
afterEach(async () => {
    await eventModel.deleteMany({});
    await userModel.deleteMany({});
});
