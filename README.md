# 🇪🇸 Spanish Fun - Gamified Language Learning

A modern, gamified Spanish learning platform built with React, Supabase, and AI.

## ✨ Features

### 🎮 Gamification
- **XP & Leveling System** - Earn experience points and level up
- **Streaks** - Maintain daily learning streaks for bonus rewards
- **Achievements** - Unlock badges for accomplishments
- **Leaderboards** - Compete with other learners
- **Journey Mode** - Race to the finish by answering correctly

### 📚 Multi-Unit Course Structure
- 8 comprehensive units covering Spanish II curriculum
- Unit 1: Reflexive Verbs & Daily Routines
- Unit 2: House & Home
- Unit 3: Food & Restaurants
- Unit 4: Health & Body
- Unit 5: Travel & Transportation
- Unit 6: Preterite Tense
- Unit 7: Imperfect Tense
- Unit 8: Commands & Requests

### 🎯 Game Types per Unit
- **Flashcards** - Study vocabulary interactively
- **Challenge Quiz** - Multiple choice questions
- **Journey Mode** - Gamified Q&A with progress tracking
- **Speaking Practice** - Voice recognition with AI feedback
- **Writing Challenge** - Open-ended writing with AI scoring
- **AI Conversation** - Practice real conversations with AI tutor

### 🤖 AI Integration
- Open-ended response scoring
- Real-time translation
- Text-to-Speech for pronunciation
- Speech-to-Text for speaking practice
- AI tutor conversations
- Personalized feedback

### 💾 Supabase Backend
- User authentication (email/password)
- Player stats persistence
- Unit progress tracking
- Game session history
- Real-time leaderboards

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for full features)

### Installation

```bash
# Clone the repository
git clone https://github.com/jrsherlock/spanish-fun.git
cd spanish-fun

# Switch to the gamification-redux branch
git checkout gamification-redux

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the migration in `supabase/migrations/001_create_schema.sql` in the SQL Editor
3. Enable Email/Password authentication in Auth settings
4. Copy your project URL and anon key to `.env.local`

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### AI Features (Optional)

For AI-powered features, you can:
1. Use Supabase Edge Functions with OpenAI
2. Or connect to your own AI backend

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/          # Login/signup screens
│   ├── Home/          # Dashboard/home screen
│   ├── Layout/        # App shell & navigation
│   └── Units/         # Unit list & detail screens
├── data/
│   ├── units.js       # Course unit definitions
│   └── unit1-content.js # Unit 1 content (vocab, questions)
├── lib/
│   └── supabase.js    # Supabase client & helpers
├── services/
│   └── aiService.js   # AI integration (TTS, scoring, etc.)
├── store/
│   └── useStore.js    # Zustand state management
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point
```

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Routing**: React Router v6
- **State**: Zustand (with persistence)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase (Auth, Database, Real-time)
- **AI**: OpenAI-compatible endpoints

## 📱 Mobile-First Design

The app is built with a mobile-first responsive design:
- Touch-friendly interactions
- Bottom navigation bar
- Safe area support for notched devices
- Smooth animations optimized for mobile

## 🗺 Roadmap

- [x] Basic app structure
- [x] Authentication system
- [x] Home dashboard
- [x] Unit navigation
- [ ] Flashcard game
- [ ] Quiz game
- [ ] Journey mode
- [ ] Speaking practice
- [ ] Writing challenges
- [ ] AI tutor chat
- [ ] Leaderboards
- [ ] Achievements
- [ ] Push notifications
- [ ] Offline support

## 📄 License

MIT License - feel free to use for learning and education!

---

Built with ❤️ for Spanish learners
