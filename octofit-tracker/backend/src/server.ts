import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import connectToDatabase from './database';
import { User } from './models/user';
import activitiesRoutes from './routes/activities';
import leaderboardRoutes from './routes/leaderboard';
import teamsRoutes from './routes/teams';
import usersRoutes from './routes/users';
import workoutsRoutes from './routes/workouts';
import { seedDatabase } from './seed';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(cors());
app.use(express.json());

connectToDatabase();

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api', async (_req: Request, res: Response) => {
  const users = await User.countDocuments().catch(() => 0);
  res.json({
    message: 'OctoFit Tracker API is ready',
    users,
    environment: process.env.NODE_ENV ?? 'development',
  });
});

app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutsRoutes);

app.post('/api/seed', async (_req: Request, res: Response) => {
  try {
    const result = await seedDatabase();
    res.json({ message: 'Seed data loaded', count: result.users.length });
  } catch (error) {
    res.status(500).json({ error: 'Unable to seed database', details: error });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit backend listening on http://0.0.0.0:${port}`);
});
