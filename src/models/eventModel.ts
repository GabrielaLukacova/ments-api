import { Schema, model } from 'mongoose';
import { Event } from '../interfaces/event';

const eventSchema = new Schema<Event>({
    title: { type: String, required: true, min: 4, max: 255 },
    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    location: { type: String, required: true, min: 4, max: 255 },
    eventType: { 
        type: String, 
        required: true, 
        enum: ["Active", "Creative", "Social", "Special", "Sport"] },
    imageURL: { type: String, required: true },
    description: { type: String, required: false, min: 6, max: 1024 },
    _createdBy: { type: String, ref: 'User', required: true }
  }, { timestamps: true });


// Middleware to support __v document versioning
type UpdateQuery<T> = {
    [key: string]: any;
} & {
    __v?: number;
    $set?: Partial<T> & { __v?: number };
    $setOnInsert?: Partial<T> & { __v?: number };
    $inc?: { __v?: number };
};

eventSchema.pre('findOneAndUpdate', function <T extends Document>(this: any) {
    const update = this.getUpdate() as UpdateQuery<T>;
    if (update.__v != null) {
        delete update.__v;
    }
    const keys: Array<'$set' | '$setOnInsert'> = ['$set', '$setOnInsert'];
    for (const key of keys) {
        if (update[key] != null && update[key]!.__v != null) {
            delete update[key]!.__v;
            if (Object.keys(update[key]!).length === 0) {
                delete update[key];
            }
        }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
});


export const EventModel = model<Event>('Event', eventSchema);