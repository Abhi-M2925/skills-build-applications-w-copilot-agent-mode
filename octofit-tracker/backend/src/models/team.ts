import { model, Schema, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    focus: { type: String, default: 'fitness' },
    coach: { type: String, default: 'Coach' },
    score: { type: Number, default: 0 },
    members: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
