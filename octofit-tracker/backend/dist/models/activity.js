"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 0 },
    distanceKm: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    description: { type: String, default: '' },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
