import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected to ${mongoUri}`);
  } catch (error) {
    console.warn('MongoDB is not available; continuing without a live connection.', error);
  }
};

export default connectToDatabase;
