import { model, Schema, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 0 },
    distanceKm: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    description: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
