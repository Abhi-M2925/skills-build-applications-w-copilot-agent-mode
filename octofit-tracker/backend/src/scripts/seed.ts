import connectToDatabase from '../database';
import { Activity } from '../models/activity';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
export const seedDatabase = async () => {
  await connectToDatabase();

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await Workout.deleteMany({});

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava@mergington.org', username: 'ava', role: 'captain', points: 180 },
    { name: 'Noah Brooks', email: 'noah@mergington.org', username: 'noah', role: 'member', points: 145 },
    { name: 'Mia Patel', email: 'mia@mergington.org', username: 'mia', role: 'member', points: 132 },
  ]);

  const teams = await Team.insertMany([
    { name: 'Thunder', focus: 'endurance', coach: 'Coach Rivera', score: 420, members: [users[0]._id, users[1]._id] },
    { name: 'Lightning', focus: 'strength', coach: 'Coach Chen', score: 385, members: [users[2]._id] },
  ]);

  const activities = await Activity.insertMany([
    { userId: users[0]._id, type: 'run', durationMinutes: 30, distanceKm: 5.2, points: 60, description: 'Morning sprint intervals' },
    { userId: users[1]._id, type: 'strength', durationMinutes: 45, distanceKm: 0, points: 55, description: 'Upper body circuit' },
    { userId: users[2]._id, type: 'walk', durationMinutes: 40, distanceKm: 3.1, points: 40, description: 'After-school walking club' },
  ]);

  const workouts = await Workout.insertMany([
    { title: 'Core Blast', category: 'strength', difficulty: 'beginner', durationMinutes: 20, focus: 'core', description: 'Quick ab and posture circuit' },
    { title: 'Endurance Loop', category: 'cardio', difficulty: 'intermediate', durationMinutes: 25, focus: 'stamina', description: 'Steady pace run' },
    { title: 'Mobility Flow', category: 'recovery', difficulty: 'beginner', durationMinutes: 15, focus: 'flexibility', description: 'Stretch and balance routine' },
  ]);

  return { users, teams, activities, workouts };
};

if (require.main === module) {
  seedDatabase()
    .then((result) => {
      console.log(`Seeded ${result.users.length} users, ${result.teams.length} teams, ${result.activities.length} activities, and ${result.workouts.length} workouts.`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to seed database', error);
      process.exit(1);
    });
}
