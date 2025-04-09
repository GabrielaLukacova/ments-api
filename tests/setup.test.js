process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import { EventModel } from '../src/models/eventModel';
import { UserModel } from '../src/models/userModel';

// Clean up the database before each test
beforeEach(async () => {
    await EventModel.deleteMany({});
    await UserModel.deleteMany({});
});

// Clean up the database after each test
afterEach(async () => {
    await EventModel.deleteMany({});
    await UserModel.deleteMany({});
});
