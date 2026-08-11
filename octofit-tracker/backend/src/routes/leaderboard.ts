import { Router, type Request, type Response } from 'express';
import { User } from '../models/user';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await User.find().sort({ points: -1 }).limit(10).select('name points role').lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard', details: error });
  }
});

export default router;
