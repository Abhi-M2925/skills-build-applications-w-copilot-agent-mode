import { Router, type Request, type Response } from 'express';
import { Workout } from '../models/workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 }).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts', details: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create workout', details: error });
  }
});

export default router;
