import { model, Schema, Types } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, trim: true },
    role: { type: String, default: 'member' },
    points: { type: Number, default: 0 },
    teamId: { type: Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
