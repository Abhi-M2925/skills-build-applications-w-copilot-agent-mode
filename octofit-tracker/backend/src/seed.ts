import connectToDatabase from './database';
import { Activity } from './models/activity';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

export interface SeedData {
  users: Array<{
    name: string;
    email: string;
    role: string;
    points: number;
  }>;
  teams: Array<{
    name: string;
    focus: string;
    coach: string;
    score: number;
  }>;
  activities: Array<{
    type: string;
    durationMinutes: number;
    distanceKm: number;
    points: number;
    description: string;
  }>;
  workouts: Array<{
    title: string;
    category: string;
    difficulty: string;
    durationMinutes: number;
    focus: string;
    description: string;
  }>;
}

export const buildSeedData = (): SeedData => ({
  users: [
    { name: 'Ava', email: 'ava@mergington.org', role: 'captain', points: 180 },
    { name: 'Noah', email: 'noah@mergington.org', role: 'member', points: 145 },
    { name: 'Mia', email: 'mia@mergington.org', role: 'member', points: 132 },
  ],
  teams: [
    { name: 'Thunder', focus: 'endurance', coach: 'Coach Rivera', score: 420 },
    { name: 'Lightning', focus: 'strength', coach: 'Coach Chen', score: 385 },
  ],
  activities: [
    { type: 'run', durationMinutes: 30, distanceKm: 5.2, points: 60, description: 'Morning sprint interval' },
    { type: 'strength', durationMinutes: 45, distanceKm: 0, points: 55, description: 'Upper body circuit' },
    { type: 'walk', durationMinutes: 40, distanceKm: 3.1, points: 40, description: 'After-school walking club' },
  ],
  workouts: [
    { title: 'Core Blast', category: 'strength', difficulty: 'beginner', durationMinutes: 20, focus: 'core', description: 'Quick ab and posture circuit' },
    { title: 'Endurance Loop', category: 'cardio', difficulty: 'intermediate', durationMinutes: 25, focus: 'stamina', description: 'Steady pace run' },
    { title: 'Mobility Flow', category: 'recovery', difficulty: 'beginner', durationMinutes: 15, focus: 'flexibility', description: 'Stretch and balance routine' },
  ],
});

export const seedDatabase = async () => {
  const { users, teams, activities, workouts } = buildSeedData();

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await Workout.deleteMany({});

  const createdUsers = await User.insertMany(users);
  const createdTeams = await Team.insertMany(teams);
  const createdActivities = await Activity.insertMany(
    activities.map((activity, index) => ({
      ...activity,
      userId: createdUsers[index % createdUsers.length]._id,
    })),
  );
  const createdWorkouts = await Workout.insertMany(workouts);

  await Team.updateMany({}, { $set: { members: createdUsers.slice(0, 2).map((user) => user._id) } });

  return {
    users: createdUsers,
    teams: createdTeams,
    activities: createdActivities,
    workouts: createdWorkouts,
  };
};

if (require.main === module) {
  connectToDatabase()
    .then(() => seedDatabase())
    .then((result) => {
      console.log(`Seeded ${result.users.length} users, ${result.teams.length} teams, ${result.activities.length} activities, and ${result.workouts.length} workouts.`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to seed database', error);
      process.exit(1);
    });
}
