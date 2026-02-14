import { AnswerOptions } from './AnswerOptions';

export function QuestionCard({
  question,
  options,
  currentIndex,
  totalCount,
  onSubmit,
  onMarkForReview,
  userStats,
  disabled,
}) {
  const stats = userStats || { timesCorrect: 0, timesWrong: 0, consecutiveCorrect: 0, markedForReview: false };

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
          Question {currentIndex} of {totalCount}
        </span>
        {stats.timesCorrect + stats.timesWrong > 0 && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            ✓ {stats.timesCorrect} right · ✗ {stats.timesWrong} wrong
            {stats.consecutiveCorrect >= 4 && (
              <span className="ml-2 text-amber-600 dark:text-amber-400 font-medium">Mastered</span>
            )}
          </span>
        )}
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
        {question.question}
      </h2>
      <AnswerOptions
        options={options}
        correctAnswer={question.correctAnswer}
        onSubmit={onSubmit}
        disabled={disabled}
      />
      {onMarkForReview && (
        <button
          type="button"
          onClick={() => onMarkForReview(!stats.markedForReview)}
          className="mt-4 text-sm text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
        >
          {stats.markedForReview ? '✓ Marked for review' : 'Mark for review'}
        </button>
      )}
    </article>
  );
}
