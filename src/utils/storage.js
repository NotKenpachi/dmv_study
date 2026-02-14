const STORAGE_KEY = 'dmv-study-app-progress';

const defaultUserStats = () => ({
  timesCorrect: 0,
  timesWrong: 0,
  lastSeen: null,
  masteryLevel: 0,
  consecutiveCorrect: 0,
  markedForReview: false,
});

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveProgress(userStatsByQuestionId) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userStatsByQuestionId));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export function getUserStatsForQuestion(userStatsByQuestionId, questionId) {
  const stats = userStatsByQuestionId[questionId];
  if (!stats) return defaultUserStats();
  return {
    ...defaultUserStats(),
    ...stats,
    lastSeen: stats.lastSeen ?? null,
  };
}

export function updateStatsAfterAnswer(userStatsByQuestionId, questionId, correct) {
  const current = getUserStatsForQuestion(userStatsByQuestionId, questionId);
  const updated = {
    ...current,
    timesCorrect: current.timesCorrect + (correct ? 1 : 0),
    timesWrong: current.timesWrong + (correct ? 0 : 1),
    lastSeen: Date.now(),
    consecutiveCorrect: correct ? current.consecutiveCorrect + 1 : 0,
    masteryLevel: correct
      ? Math.min(5, Math.floor((current.consecutiveCorrect + 1) / 4) + 1)
      : 0,
  };
  const next = { ...userStatsByQuestionId, [questionId]: updated };
  saveProgress(next);
  return next;
}

export function markForReview(userStatsByQuestionId, questionId, value) {
  const current = getUserStatsForQuestion(userStatsByQuestionId, questionId);
  const updated = { ...current, markedForReview: value };
  const next = { ...userStatsByQuestionId, [questionId]: updated };
  saveProgress(next);
  return next;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportProgress(userStatsByQuestionId) {
  return JSON.stringify({ data: userStatsByQuestionId, exportedAt: new Date().toISOString() }, null, 2);
}

export function importProgress(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    const data = parsed.data || parsed;
    if (typeof data !== 'object') return null;
    saveProgress(data);
    return data;
  } catch {
    return null;
  }
}
