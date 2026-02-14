import { useState, useCallback } from 'react';
import questionsData from '../data/questions.json';
import { getShuffledOptions } from '../utils/questionOptions';
import {
  loadProgress,
  getUserStatsForQuestion,
  updateStatsAfterAnswer,
  markForReview,
  resetProgress as resetStorage,
  exportProgress as exportToJson,
  importProgress as importFromJson,
} from '../utils/storage';

export function useQuestions() {
  const [questions] = useState(questionsData);
  const [userStats, setUserStats] = useState(() => {
    const loaded = loadProgress();
    return loaded || {};
  });

  const getOptionsForQuestion = useCallback(
    (question) => getShuffledOptions(question, questions),
    [questions]
  );

  const getStats = useCallback(
    (questionId) => getUserStatsForQuestion(userStats, questionId),
    [userStats]
  );

  const recordAnswer = useCallback((questionId, correct) => {
    setUserStats((prev) => updateStatsAfterAnswer(prev, questionId, correct));
  }, []);

  const toggleMarkForReview = useCallback((questionId, value) => {
    setUserStats((prev) => markForReview(prev, questionId, value));
  }, []);

  const resetProgress = useCallback(() => {
    resetStorage();
    setUserStats({});
  }, []);

  const exportProgress = useCallback(() => exportToJson(userStats), [userStats]);

  const importProgress = useCallback((jsonString) => {
    const data = importFromJson(jsonString);
    if (data) setUserStats(data);
    return !!data;
  }, []);

  return {
    questions,
    userStats,
    setUserStats,
    getOptionsForQuestion,
    getStats,
    recordAnswer,
    toggleMarkForReview,
    resetProgress,
    exportProgress,
    importProgress,
  };
}
