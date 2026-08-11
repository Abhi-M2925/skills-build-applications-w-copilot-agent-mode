"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const connectToDatabase = async () => {
    if (mongoose_1.default.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose_1.default.connect(mongoUri, { dbName: 'octofit_db' });
        console.log(`MongoDB connected to ${mongoUri} using mongoose`);
    }
    catch (error) {
        console.warn('MongoDB is not available; continuing without a live connection.', error);
    }
};
exports.connectToDatabase = connectToDatabase;
exports.default = exports.connectToDatabase;
