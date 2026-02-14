import { StatsDisplay } from './StatsDisplay';

export function ProgressDashboard({ questions, userStats }) {
  const answered = Object.keys(userStats || {}).filter(
    (id) => (userStats[id].timesCorrect || 0) + (userStats[id].timesWrong || 0) > 0
  ).length;
  const total = questions.length;
  const pct = total ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Your progress</h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {answered} of {total} attempted
        </span>
      </div>
      <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <StatsDisplay questions={questions} userStats={userStats} />
    </div>
  );
}
