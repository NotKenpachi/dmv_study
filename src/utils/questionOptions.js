/**
 * Generate 4 multiple choice options for a question (1 correct + 3 wrong).
 * Wrong answers are sampled from other questions' correct answers for plausibility.
 */
export function getShuffledOptions(question, allQuestions) {
  const correct = question.correctAnswer;
  const otherAnswers = allQuestions
    .filter((q) => q.id !== question.id)
    .map((q) => q.correctAnswer)
    .filter((a) => a !== correct && a.trim().length > 0);

  // Pick 3 unique wrong answers (shuffle and take first 3)
  const shuffled = [...otherAnswers].sort(() => Math.random() - 0.5);
  const wrong = shuffled.slice(0, 3);

  const options = [correct, ...wrong];
  return options.sort(() => Math.random() - 0.5);
}
