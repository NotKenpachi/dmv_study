import { useState, useEffect } from 'react';
import { useQuestions } from './hooks/useQuestions';
import { QuestionCard } from './components/QuestionCard';
import { FeedbackCard } from './components/FeedbackCard';
import { ProgressDashboard } from './components/ProgressDashboard';

function App() {
  const {
    questions,
    userStats,
    getOptionsForQuestion,
    getStats,
    recordAnswer,
    toggleMarkForReview,
    resetProgress,
    exportProgress,
    importProgress,
  } = useQuestions();

  const [screen, setScreen] = useState('home'); // 'home' | 'practice'
  const [practiceQueue, setPracticeQueue] = useState([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
    return false;
  });

  const startPractice = (count = 20) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, Math.min(count, questions.length));
    setPracticeQueue(shuffled);
    setPracticeIndex(0);
    setCurrentOptions(shuffled[0] ? getOptionsForQuestion(shuffled[0]) : []);
    setShowFeedback(false);
    setScreen('practice');
  };

  const currentQuestion = practiceQueue[practiceIndex];
  const isLast = practiceIndex >= practiceQueue.length - 1;

  const handleSubmitAnswer = (correct) => {
    if (!currentQuestion) return;
    recordAnswer(currentQuestion.id, correct);
    setLastCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isLast) {
      setScreen('home');
      return;
    }
    setPracticeIndex((i) => i + 1);
    const next = practiceQueue[practiceIndex + 1];
    setCurrentOptions(getOptionsForQuestion(next));
    setShowFeedback(false);
  };

  const toggleDark = () => {
    setDarkMode((d) => !d);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">CA DMV Study</h1>
          <button
            type="button"
            onClick={toggleDark}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        {screen === 'home' && (
          <HomeScreen
            questions={questions}
            userStats={userStats}
            onStartPractice={startPractice}
            onResetProgress={resetProgress}
            onExportProgress={exportProgress}
            onImportProgress={importProgress}
          />
        )}

        {screen === 'practice' && currentQuestion && (
          <div className="space-y-6">
            {!showFeedback ? (
              <QuestionCard
                question={currentQuestion}
                options={currentOptions}
                currentIndex={practiceIndex + 1}
                totalCount={practiceQueue.length}
                onSubmit={handleSubmitAnswer}
                onMarkForReview={(value) => toggleMarkForReview(currentQuestion.id, value)}
                userStats={getStats(currentQuestion.id)}
                disabled={showFeedback}
              />
            ) : (
              <FeedbackCard
                correct={lastCorrect}
                question={currentQuestion}
                onNext={handleNext}
              />
            )}
            <button
              type="button"
              onClick={() => setScreen('home')}
              className="text-sm text-slate-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              ← Back to home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function HomeScreen({
  questions,
  userStats,
  onStartPractice,
  onResetProgress,
  onExportProgress,
  onImportProgress,
}) {
  const hasProgress = Object.keys(userStats || {}).some(
    (id) => (userStats[id].timesCorrect || 0) + (userStats[id].timesWrong || 0) > 0
  );

  const handleExport = () => {
    const json = onExportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dmv-study-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = onImportProgress(reader.result);
      if (ok) alert('Progress imported.');
      else alert('Invalid file.');
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          California DMV Practice
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          150 official practice questions. Study at your own pace and track your progress.
        </p>
      </section>

      <section className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => onStartPractice(20)}
          className="flex-1 py-4 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg transition-colors shadow-lg shadow-primary-500/25"
        >
          Start Practice (20 questions)
        </button>
        <button
          type="button"
          onClick={() => onStartPractice(questions.length)}
          className="flex-1 py-4 px-6 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold transition-colors"
        >
          All 150 questions
        </button>
      </section>

      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <ProgressDashboard questions={questions} userStats={userStats} />
      </section>

      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleExport}
          disabled={!hasProgress}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 text-sm"
        >
          Export progress
        </button>
        <label className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-sm">
          Import progress
          <input type="file" accept=".json,application/json" className="hidden" onChange={handleImport} />
        </label>
        <button
          type="button"
          onClick={() => hasProgress && confirm('Reset all progress?') && onResetProgress()}
          disabled={!hasProgress}
          className="px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 text-sm"
        >
          Reset progress
        </button>
      </section>
    </div>
  );
}

export default App;
