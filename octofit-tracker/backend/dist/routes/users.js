"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const users = await user_1.User.find().sort({ points: -1 }).lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load users', details: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const { name, email, username, role, points = 0, teamId } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'name and email are required' });
        }
        const user = await user_1.User.create({
            name,
            email,
            username: username ?? email.split('@')[0],
            role: role ?? 'member',
            points,
            teamId: teamId ?? undefined,
        });
        if (teamId) {
            await team_1.Team.findByIdAndUpdate(teamId, { $addToSet: { members: user._id } }, { new: true });
        }
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to create user', details: error });
    }
});
exports.default = router;
