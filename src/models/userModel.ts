// import { Schema, model } from 'mongoose';
import mongoose, { Schema, model } from 'mongoose';
import { User } from '../interfaces/user';

const userSchema = new Schema<User>({
    name: { type: String, required: true, min: 6, max: 30},
    email: { type: String, required: true, min: 6, max: 30, unique: true},
    password: { type: String, required: true, min: 6, max: 15},
    registerDate: { type: Date, default: Date.now }
});

// export const userModel = model<User>('User', userSchema);
export const userModel = mongoose.model<User>('User', userSchema);
