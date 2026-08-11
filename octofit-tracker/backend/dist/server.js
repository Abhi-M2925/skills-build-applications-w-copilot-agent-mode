"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const user_1 = require("./models/user");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, database_1.default)();
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api', async (_req, res) => {
    const users = await user_1.User.countDocuments().catch(() => 0);
    res.json({
        message: 'OctoFit Tracker API is ready',
        users,
        environment: process.env.NODE_ENV ?? 'development',
    });
});
app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit backend listening on http://0.0.0.0:${port}`);
});
