"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const teams = await team_1.Team.find().populate('members', 'name email').lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load teams', details: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const { name, focus, coach, score = 0 } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'name is required' });
        }
        const team = await team_1.Team.create({ name, focus, coach, score });
        res.status(201).json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to create team', details: error });
    }
});
exports.default = router;
