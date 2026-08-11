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
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const seed_1 = require("./seed");
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
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.post('/api/seed', async (_req, res) => {
    try {
        const result = await (0, seed_1.seedDatabase)();
        res.json({ message: 'Seed data loaded', count: result.users.length });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to seed database', details: error });
    }
});
app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit backend listening on http://0.0.0.0:${port}`);
});
