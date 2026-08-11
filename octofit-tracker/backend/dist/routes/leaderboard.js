"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await user_1.User.find().sort({ points: -1 }).limit(10).select('name points role').lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load leaderboard', details: error });
    }
});
exports.default = router;
