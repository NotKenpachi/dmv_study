import { useMemo } from 'react';
import { getUserStatsForQuestion } from '../utils/storage';

export function StatsDisplay({ questions, userStats }) {
  const stats = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let struggling = 0;
    let neverSeen = 0;
    questions.forEach((q) => {
      const s = getUserStatsForQuestion(userStats || {}, q.id);
      const total = s.timesCorrect + s.timesWrong;
      if (total === 0) neverSeen++;
      else if (s.consecutiveCorrect >= 4) mastered++;
      else if (s.timesWrong > s.timesCorrect) struggling++;
      else learning++;
    });
    return { total: questions.length, mastered, learning, struggling, neverSeen };
  }, [questions, userStats]);

  const pct = (n) => (stats.total ? Math.round((n / stats.total) * 100) : 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatBox label="Total" value={stats.total} sub="" color="slate" />
      <StatBox label="Never seen" value={stats.neverSeen} sub={`${pct(stats.neverSeen)}%`} color="blue" />
      <StatBox label="Learning" value={stats.learning} sub={`${pct(stats.learning)}%`} color="purple" />
      <StatBox label="Struggling" value={stats.struggling} sub={`${pct(stats.struggling)}%`} color="red" />
      <StatBox label="Mastered" value={stats.mastered} sub={`${pct(stats.mastered)}%`} color="amber" className="col-span-2 sm:col-span-1" />
    </div>
  );
}

function StatBox({ label, value, sub, color, className = '' }) {
  const colors = {
    slate: 'bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
  };
  return (
    <div className={`rounded-xl p-4 ${colors[color]} ${className}`}>
      <p className="text-sm font-medium opacity-90">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-sm opacity-80">{sub}</p>}
    </div>
  );
}
