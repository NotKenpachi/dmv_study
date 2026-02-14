export function FeedbackCard({ correct, question, onNext }) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold mb-4 ${
          correct
            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
        }`}
      >
        {correct ? '✓ Correct!' : '✗ Incorrect'}
      </div>
      {!correct && (
        <div className="mb-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Correct answer:</p>
          <p className="text-slate-800 dark:text-slate-100 font-medium">{question.correctAnswer}</p>
        </div>
      )}
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Explanation</p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{question.explanation}</p>
      </div>
      <button
        type="button"
        onClick={onNext}
        className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors"
      >
        Next Question
      </button>
    </article>
  );
}
