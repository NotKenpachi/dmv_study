import { useState } from 'react';

const optionLabels = ['1', '2', '3', '4'];

export function AnswerOptions({ options, correctAnswer, onSubmit, disabled }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSubmit = () => {
    if (selected === null || disabled) return;
    setRevealed(true);
    const isCorrect = options[selected] === correctAnswer;
    onSubmit(isCorrect);
  };

  const isCorrectOption = (opt) => opt === correctAnswer;
  const showCorrect = (idx) => revealed && isCorrectOption(options[idx]);
  const showWrong = (idx) => revealed && selected === idx && !isCorrectOption(options[idx]);

  return (
    <div className="space-y-3">
      {options.map((opt, idx) => {
        const correct = showCorrect(idx);
        const wrong = showWrong(idx);
        const style = correct
          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
          : wrong
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          : 'border-slate-200 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500';
        return (
          <button
            key={idx}
            type="button"
            disabled={disabled || revealed}
            onClick={() => !revealed && setSelected(idx)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${style} ${
              selected === idx && !revealed ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900' : ''
            }`}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-600 flex items-center justify-center font-semibold text-slate-700 dark:text-slate-200">
              {optionLabels[idx]}
            </span>
            <span className="flex-1">{opt}</span>
            {correct && <span className="text-green-600 dark:text-green-400 font-medium">✓ Correct</span>}
            {wrong && <span className="text-red-600 dark:text-red-400 font-medium">✗ Incorrect</span>}
          </button>
        );
      })}
      <button
        type="button"
        disabled={selected === null || revealed}
        onClick={handleSubmit}
        className="w-full mt-4 py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
      >
        Submit Answer
      </button>
    </div>
  );
}
