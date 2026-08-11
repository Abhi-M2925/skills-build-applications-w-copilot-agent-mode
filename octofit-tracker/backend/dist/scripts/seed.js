"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const database_1 = __importDefault(require("../database"));
const activity_1 = require("../models/activity");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    await (0, database_1.default)();
    await user_1.User.deleteMany({});
    await team_1.Team.deleteMany({});
    await activity_1.Activity.deleteMany({});
    await workout_1.Workout.deleteMany({});
    const users = await user_1.User.insertMany([
        { name: 'Ava Chen', email: 'ava@mergington.org', username: 'ava', role: 'captain', points: 180 },
        { name: 'Noah Brooks', email: 'noah@mergington.org', username: 'noah', role: 'member', points: 145 },
        { name: 'Mia Patel', email: 'mia@mergington.org', username: 'mia', role: 'member', points: 132 },
    ]);
    const teams = await team_1.Team.insertMany([
        { name: 'Thunder', focus: 'endurance', coach: 'Coach Rivera', score: 420, members: [users[0]._id, users[1]._id] },
        { name: 'Lightning', focus: 'strength', coach: 'Coach Chen', score: 385, members: [users[2]._id] },
    ]);
    const activities = await activity_1.Activity.insertMany([
        { userId: users[0]._id, type: 'run', durationMinutes: 30, distanceKm: 5.2, points: 60, description: 'Morning sprint intervals' },
        { userId: users[1]._id, type: 'strength', durationMinutes: 45, distanceKm: 0, points: 55, description: 'Upper body circuit' },
        { userId: users[2]._id, type: 'walk', durationMinutes: 40, distanceKm: 3.1, points: 40, description: 'After-school walking club' },
    ]);
    const workouts = await workout_1.Workout.insertMany([
        { title: 'Core Blast', category: 'strength', difficulty: 'beginner', durationMinutes: 20, focus: 'core', description: 'Quick ab and posture circuit' },
        { title: 'Endurance Loop', category: 'cardio', difficulty: 'intermediate', durationMinutes: 25, focus: 'stamina', description: 'Steady pace run' },
        { title: 'Mobility Flow', category: 'recovery', difficulty: 'beginner', durationMinutes: 15, focus: 'flexibility', description: 'Stretch and balance routine' },
    ]);
    return { users, teams, activities, workouts };
};
exports.seedDatabase = seedDatabase;
if (require.main === module) {
    (0, exports.seedDatabase)()
        .then((result) => {
        console.log(`Seeded ${result.users.length} users, ${result.teams.length} teams, ${result.activities.length} activities, and ${result.workouts.length} workouts.`);
        process.exit(0);
    })
        .catch((error) => {
        console.error('Failed to seed database', error);
        process.exit(1);
    });
}
