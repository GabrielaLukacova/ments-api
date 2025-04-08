"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventModel = void 0;
const mongoose_1 = require("mongoose");
// Event schema definition with validation and required fields
const eventSchema = new mongoose_1.Schema({
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
    _createdBy: { type: String, ref: 'User' }
}, { timestamps: true });
// Pre-update middleware to manage versioning
eventSchema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();
    // Remove __v from the update object to avoid direct modification
    if (update.__v != null) {
        delete update.__v;
    }
    // Check for versioning keys and remove __v from them if necessary
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
        if (update[key] != null && update[key].__v != null) {
            delete update[key].__v;
            // If the $set or $setOnInsert object is empty, delete the key
            if (Object.keys(update[key]).length === 0) {
                delete update[key];
            }
        }
    }
    // Ensure the version (__v) is incremented during updates
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
});
// Create and export the Event model based on the event schema
exports.eventModel = (0, mongoose_1.model)('Event', eventSchema);
//# sourceMappingURL=eventModel.js.map