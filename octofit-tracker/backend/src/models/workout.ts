import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    difficulty: { type: String, default: 'beginner' },
    durationMinutes: { type: Number, default: 20 },
    focus: { type: String, default: 'full-body' },
    description: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
