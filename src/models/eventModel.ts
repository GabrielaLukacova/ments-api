import { Schema, model, Document } from 'mongoose';
import { Event } from '../interfaces/event';

// Event schema definition with validation and required fields
const eventSchema = new Schema<Event>({
  title: { type: String, required: true, min: 4, max: 255 },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true, min: 4, max: 255 },
  eventType: { 
    type: String, 
    required: true, 
    enum: ["Active", "Creative", "Social", "Special", "Sport"]
  },
  imageURL: { type: String, required: true },
  description: { type: String, required: false, min: 6, max: 1024 },
  _createdBy: { type: String, ref: 'User'}
}, { timestamps: true });

// Middleware to handle __v document versioning during updates
type UpdateQuery<T> = {
  [key: string]: unknown;
} & {
  __v?: number;
  $set?: Partial<T> & { __v?: number };
  $setOnInsert?: Partial<T> & { __v?: number };
  $inc?: { __v?: number };
};

// Pre-update middleware to manage versioning
eventSchema.pre('findOneAndUpdate', function <T extends Document>(this: any) {
  const update = this.getUpdate() as UpdateQuery<T>;
  
  // Remove __v from the update object to avoid direct modification
  if (update.__v != null) {
    delete update.__v;
  }

  // Check for versioning keys and remove __v from them if necessary
  const keys: Array<'$set' | '$setOnInsert'> = ['$set', '$setOnInsert'];
  for (const key of keys) {
    if (update[key] != null && update[key]!.__v != null) {
      delete update[key]!.__v;
      // If the $set or $setOnInsert object is empty, delete the key
      if (Object.keys(update[key]!).length === 0) {
        delete update[key];
      }
    }
  }

  // Ensure the version (__v) is incremented during updates
  update.$inc = update.$inc || {};
  update.$inc.__v = 1;
});

// Create and export the Event model based on the event schema
export const eventModel = model<Event>('Event', eventSchema);
