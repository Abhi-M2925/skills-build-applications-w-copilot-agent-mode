import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSeedData } from './seed';

test('buildSeedData returns users, teams, activities, and workouts', () => {
  const data = buildSeedData();

  assert.equal(data.users.length, 3);
  assert.equal(data.teams.length, 2);
  assert.equal(data.activities.length, 3);
  assert.equal(data.workouts.length, 3);
  assert.ok(data.users.every((user) => user.email.includes('@')));
});
