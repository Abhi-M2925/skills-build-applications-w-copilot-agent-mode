"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = exports.buildSeedData = void 0;
const database_1 = __importDefault(require("./database"));
const activity_1 = require("./models/activity");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const buildSeedData = () => ({
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
exports.buildSeedData = buildSeedData;
const seedDatabase = async () => {
    const { users, teams, activities, workouts } = (0, exports.buildSeedData)();
    await user_1.User.deleteMany({});
    await team_1.Team.deleteMany({});
    await activity_1.Activity.deleteMany({});
    await workout_1.Workout.deleteMany({});
    const createdUsers = await user_1.User.insertMany(users);
    const createdTeams = await team_1.Team.insertMany(teams);
    const createdActivities = await activity_1.Activity.insertMany(activities.map((activity, index) => ({
        ...activity,
        userId: createdUsers[index % createdUsers.length]._id,
    })));
    const createdWorkouts = await workout_1.Workout.insertMany(workouts);
    await team_1.Team.updateMany({}, { $set: { members: createdUsers.slice(0, 2).map((user) => user._id) } });
    return {
        users: createdUsers,
        teams: createdTeams,
        activities: createdActivities,
        workouts: createdWorkouts,
    };
};
exports.seedDatabase = seedDatabase;
if (require.main === module) {
    (0, database_1.default)()
        .then(() => (0, exports.seedDatabase)())
        .then((result) => {
        console.log(`Seeded ${result.users.length} users, ${result.teams.length} teams, ${result.activities.length} activities, and ${result.workouts.length} workouts.`);
        process.exit(0);
    })
        .catch((error) => {
        console.error('Failed to seed database', error);
        process.exit(1);
    });
}
