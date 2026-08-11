import { Router, type Request, type Response } from 'express';
import { Team } from '../models/team';
import { User } from '../models/user';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ points: -1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users', details: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, username, role, points = 0, teamId } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }

    const user = await User.create({
      name,
      email,
      username: username ?? email.split('@')[0],
      role: role ?? 'member',
      points,
      teamId: teamId ?? undefined,
    });

    if (teamId) {
      await Team.findByIdAndUpdate(teamId, { $addToSet: { members: user._id } }, { new: true });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user', details: error });
  }
});

export default router;
