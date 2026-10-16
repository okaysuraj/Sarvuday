import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mean, moodValue, recentRecords, recordedStreak } from '../src/utils/healthMetrics.js';

test('unknown measurements remain unknown and recorded zero remains zero', () => {
  assert.equal(moodValue(null), null);
  assert.equal(moodValue(0), 0);
  assert.equal(moodValue(5), null);
  assert.equal(moodValue('good'), 3);
  assert.equal(mean([null, undefined]), null);
  assert.equal(mean([0, null, 4]), 2);
});

test('streak counts distinct consecutive local dates, not the number of entries', () => {
  const now = new Date(2026, 9, 16, 12);
  const records = [16, 16, 15, 13].map(day => ({ created_at: new Date(2026, 9, day, 10).toISOString() }));
  assert.equal(recordedStreak(records, now), 2);
  assert.equal(recordedStreak([], now), 0);
});

test('period summaries exclude historical weekdays and future entries', () => {
  const now = new Date(2026, 9, 16, 12);
  const records = [1, 10, 16, 17].map(day => ({ created_at: new Date(2026, 9, day, 10).toISOString() }));
  assert.equal(recentRecords(records, 7, now).length, 2);
});
