# California DMV Study App

A modern, interactive web app to study for the California DMV written test using 150 official practice questions. Progress is saved in your browser and you can export/import it.

## Features (Phase 1)

- **Practice mode**: Answer questions with immediate feedback and explanations
- **Progress tracking**: Per-question stats (correct/wrong, streaks, mastered)
- **Dashboard**: See counts for never seen, learning, struggling, and mastered
- **Persistence**: Progress saved in `localStorage` after each answer
- **Export / Import**: Download or upload your progress as JSON
- **Reset**: Clear all progress
- **Dark mode**: Toggle in the header

## Run locally

```bash
cd dmv-study-app
npm install
npm run dev
```

Then open the URL shown (e.g. http://localhost:5173).

**If `npm` is not recognized** (Windows): Node may be installed but not on your PATH. See [PATH-FIX.md](./PATH-FIX.md) for steps to fix it. After fixing, close and reopen your terminal (or Cursor).

## Build

```bash
npm run build
npm run preview   # optional: preview production build
```

## Tech stack

- React 18 + Vite
- Tailwind CSS
- No backend; data in `localStorage`

## Roadmap

- **Phase 2**: Adaptive question selection (spaced repetition, priority by performance)
- **Phase 3**: Test mode (46 questions), Review mode, custom quiz length
- **Phase 4**: Keyboard shortcuts, animations, optional sound, study reminders
