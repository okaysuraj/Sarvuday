export const MOOD_LABELS = ['Very low', 'Low', 'Neutral', 'Good', 'Great'];
export function moodValue(value) {
  if (value == null || value === '') return null;
  const labels = { low: 0, down: 1, neutral: 2, good: 3, great: 4 };
  const number = Number(labels[value] ?? value);
  return Number.isInteger(number) && number >= 0 && number <= 4 ? number : null;
}
export function mean(values) {
  const recorded = values.filter((value) => typeof value === 'number' && Number.isFinite(value));
  return recorded.length ? recorded.reduce((sum, value) => sum + value, 0) / recorded.length : null;
}
export function localDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function recentRecords(records, days, now = new Date()) {
  const start = new Date(now);
  start.setDate(start.getDate() - days + 1);
  start.setHours(0, 0, 0, 0);
  return records.filter((record) => {
    const time = new Date(record.created_at).getTime();
    return time >= start.getTime() && time <= now.getTime();
  });
}
export function recordedStreak(records, now = new Date()) {
  const dates = new Set(records.map((record) => localDateKey(record.created_at)).filter(Boolean));
  const day = new Date(now);
  day.setHours(12, 0, 0, 0);
  if (!dates.has(localDateKey(day))) day.setDate(day.getDate() - 1);
  let streak = 0;
  while (dates.has(localDateKey(day))) {
    streak++;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}
