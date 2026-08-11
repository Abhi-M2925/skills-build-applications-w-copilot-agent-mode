import { Router, type Request, type Response } from 'express';
import { Team } from '../models/team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members', 'name email').lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams', details: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, focus, coach, score = 0 } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const team = await Team.create({ name, focus, coach, score });
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create team', details: error });
  }
});

export default router;
