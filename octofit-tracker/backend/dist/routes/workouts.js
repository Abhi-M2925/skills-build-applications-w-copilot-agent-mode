"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await workout_1.Workout.find().sort({ createdAt: -1 }).lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load workouts', details: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const workout = await workout_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to create workout', details: error });
    }
});
exports.default = router;
