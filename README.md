# 🇪🇸 Spanish II - Reflexive Verbs Master

An interactive web application to help students master Spanish reflexive verbs through quizzes, flashcards, and practice exercises.

## Features

- 📚 **Learn Mode**: Study flashcards with verb meanings, pronouns, and key rules
- 🎯 **Challenge Quiz**: Test your knowledge with randomized questions covering:
  - Verb meanings
  - Pronoun matching
  - Reflexive vs. non-reflexive usage
  - Conjugation
  - Pronoun placement
  - Preposition rules
- 💬 **Routine Practice**: Answer questions about daily routines in complete Spanish sentences

## Tech Stack

- React 18
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/spanish-fun.git
cd spanish-fun
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### First-time Setup

1. Create a new repository on GitHub (e.g., `spanish-fun`)

2. Update the `base` path in `vite.config.js` to match your repository name:
```js
base: '/your-repo-name/',
```

3. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

4. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/spanish-fun.git
git push -u origin main
```

The GitHub Actions workflow will automatically build and deploy your app to GitHub Pages. Your app will be available at:
`https://YOUR_USERNAME.github.io/spanish-fun/`

### Manual Deployment (Alternative)

If you prefer to deploy manually, you can use the `gh-pages` package:

1. Install `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Add a deploy script to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## Project Structure

```
spanish-fun/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment workflow
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## License

MIT
