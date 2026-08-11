import { Router, type Request, type Response } from 'express';
import { Activity } from '../models/activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).populate('userId', 'name email').lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities', details: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create activity', details: error });
  }
});

export default router;
