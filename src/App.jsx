import React, { useState, useEffect } from 'react';

const reflexiveVerbs = [
  { infinitive: 'levantarse', meaning: 'to get up', stem: 'levant', regular: true, explanation: 'Levantar = to lift/raise. Adding -se makes it "to raise oneself" = get up' },
  { infinitive: 'acostarse', meaning: 'to go to bed', stem: 'acuest', regular: false, stemChange: 'o→ue', explanation: 'Acostar = to lay down. Adding -se makes it "to lay oneself down" = go to bed. Stem changes o→ue.' },
  { infinitive: 'ducharse', meaning: 'to shower', stem: 'duch', regular: true, explanation: 'From "ducha" (shower). Always reflexive - you shower yourself!' },
  { infinitive: 'bañarse', meaning: 'to bathe', stem: 'bañ', regular: true, explanation: 'From "baño" (bath). Reflexive when bathing yourself, non-reflexive when bathing someone else.' },
  { infinitive: 'lavarse', meaning: 'to wash oneself', stem: 'lav', regular: true, explanation: 'Lavar = to wash. Lavarse = to wash oneself. Key difference for your test!' },
  { infinitive: 'cepillarse', meaning: 'to brush (hair/teeth)', stem: 'cepill', regular: true, explanation: 'From "cepillo" (brush). Reflexive because you brush YOUR OWN hair/teeth.' },
  { infinitive: 'peinarse', meaning: 'to comb one\'s hair', stem: 'pein', regular: true, explanation: 'From "peine" (comb). Reflexive - combing your own hair.' },
  { infinitive: 'maquillarse', meaning: 'to put on makeup', stem: 'maquill', regular: true, explanation: 'From "maquillaje" (makeup). Reflexive - putting makeup on yourself.' },
  { infinitive: 'afeitarse', meaning: 'to shave', stem: 'afeit', regular: true, explanation: 'Afeitar = to shave. Reflexive when shaving yourself.' },
  { infinitive: 'vestirse', meaning: 'to get dressed', stem: 'vist', regular: false, stemChange: 'e→i', explanation: 'Vestir = to dress. Vestirse = to dress oneself. Stem changes e→i.' },
  { infinitive: 'despertarse', meaning: 'to wake up', stem: 'despiert', regular: false, stemChange: 'e→ie', explanation: 'Despertar = to wake (someone). Despertarse = to wake oneself up. Stem changes e→ie.' },
  { infinitive: 'dormirse', meaning: 'to fall asleep', stem: 'duerm', regular: false, stemChange: 'o→ue', explanation: 'Dormir = to sleep. Dormirse = to fall asleep. Stem changes o→ue.' },
  { infinitive: 'secarse', meaning: 'to dry oneself', stem: 'sec', regular: true, explanation: 'Secar = to dry. Secarse = to dry oneself off.' },
  { infinitive: 'ponerse', meaning: 'to put on (clothing)', stem: 'pon', regular: false, irregular: true, explanation: 'Poner = to put. Ponerse = to put on (yourself). Irregular: yo me pongo.' },
  { infinitive: 'quitarse', meaning: 'to take off (clothing)', stem: 'quit', regular: true, explanation: 'Quitar = to remove. Quitarse = to remove from oneself = take off clothes.' },
  { infinitive: 'sentarse', meaning: 'to sit down', stem: 'sient', regular: false, stemChange: 'e→ie', explanation: 'Sentar = to seat. Sentarse = to seat oneself = sit down. Stem changes e→ie.' },
];

const pronouns = ['me', 'te', 'se', 'nos', 'os', 'se'];
const subjects = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'];
const arEndings = ['o', 'as', 'a', 'amos', 'áis', 'an'];
const erEndings = ['o', 'es', 'e', 'emos', 'éis', 'en'];
const irEndings = ['o', 'es', 'e', 'imos', 'ís', 'en'];

const pronounExplanations = {
  0: 'YO always uses ME. Think: "I wash MYSELF" = Yo ME lavo.',
  1: 'TÚ always uses TE. Think: "You wash YOURSELF" = Tú TE lavas.',
  2: 'ÉL/ELLA/USTED uses SE. Think: "He/She washes HIMSELF/HERSELF" = Él SE lava.',
  3: 'NOSOTROS uses NOS. Think: "We wash OURSELVES" = Nosotros NOS lavamos.',
  4: 'VOSOTROS uses OS. Think: "You all wash YOURSELVES" = Vosotros OS laváis.',
  5: 'ELLOS/ELLAS/USTEDES uses SE. Think: "They wash THEMSELVES" = Ellos SE lavan.'
};

const routineQuestions = [
  { question: '¿A qué hora te levantas?', hint: 'What time do you get up?', exampleAnswer: 'Me levanto a las siete de la mañana.' },
  { question: '¿A qué hora te acuestas?', hint: 'What time do you go to bed?', exampleAnswer: 'Me acuesto a las diez de la noche.' },
  { question: '¿Te duchas por la mañana o por la noche?', hint: 'Do you shower in the morning or at night?', exampleAnswer: 'Me ducho por la mañana.' },
  { question: '¿Cómo se llama tu mejor amigo/a?', hint: 'What is your best friend\'s name?', exampleAnswer: 'Mi mejor amigo se llama Carlos.' },
  { question: '¿A qué hora se despierta tu mamá?', hint: 'What time does your mom wake up?', exampleAnswer: 'Mi mamá se despierta a las seis.' },
  { question: '¿Te cepillas los dientes después de comer?', hint: 'Do you brush your teeth after eating?', exampleAnswer: 'Sí, me cepillo los dientes después de comer.' },
];

const reflexiveVsNot = [
  { sentence: 'Yo ___ las manos antes de comer.', options: ['lavo', 'me lavo'], correct: 1, explanation: 'You wash YOUR OWN hands → reflexive (me lavo). The action reflects back to yourself!' },
  { sentence: 'Yo ___ el carro los sábados.', options: ['lavo', 'me lavo'], correct: 0, explanation: 'You wash THE CAR (not yourself) → not reflexive (lavo). The action goes to something else, not back to you.' },
  { sentence: 'María ___ a las ocho.', options: ['despierta', 'se despierta'], correct: 1, explanation: 'María wakes HERSELF up → reflexive (se despierta). She\'s doing the action to herself.' },
  { sentence: 'María ___ a su hermano.', options: ['despierta', 'se despierta'], correct: 0, explanation: 'María wakes up HER BROTHER → not reflexive (despierta). She\'s doing the action to someone else.' },
  { sentence: 'Los niños ___ en la piscina.', options: ['bañan', 'se bañan'], correct: 1, explanation: 'The kids bathe THEMSELVES → reflexive (se bañan). They\'re bathing their own bodies.' },
  { sentence: 'La mamá ___ al bebé.', options: ['baña', 'se baña'], correct: 0, explanation: 'Mom bathes THE BABY → not reflexive (baña). She\'s bathing someone else, not herself.' },
  { sentence: 'Yo ___ temprano los lunes.', options: ['acuesto', 'me acuesto'], correct: 1, explanation: 'You put YOURSELF to bed → reflexive (me acuesto). You\'re laying yourself down.' },
  { sentence: 'Ella ___ elegante para la fiesta.', options: ['viste', 'se viste'], correct: 1, explanation: 'She dresses HERSELF → reflexive (se viste). She\'s putting clothes on her own body.' },
];

const pronounPlacement = [
  { 
    setup: 'Yo / levantarse / temprano (conjugated)', 
    correct: 'Yo me levanto temprano.',
    options: ['Yo me levanto temprano.', 'Yo levanto me temprano.', 'Yo levantome temprano.'],
    rule: 'With conjugated verbs, the pronoun goes BEFORE the verb. Subject + PRONOUN + conjugated verb.'
  },
  { 
    setup: 'Voy a / ducharse (infinitive)', 
    correct: 'Voy a ducharme.',
    options: ['Voy a ducharme.', 'Voy a me duchar.', 'Me voy a duchar.'],
    rule: 'With infinitives, the pronoun attaches to the END of the infinitive. Duchar + me = ducharme.'
  },
  { 
    setup: 'Necesito / vestirse / rápido (infinitive)', 
    correct: 'Necesito vestirme rápido.',
    options: ['Necesito vestirme rápido.', 'Necesito me vestir rápido.', 'Me necesito vestir rápido.'],
    rule: 'With infinitives, the pronoun attaches to the END. Change -se to match the subject: vestirse → vestirme for "yo".'
  },
  { 
    setup: 'Ella / querer / maquillarse (infinitive)', 
    correct: 'Ella quiere maquillarse.',
    options: ['Ella quiere maquillarse.', 'Ella quiere se maquillar.', 'Ella se quiere maquillar.'],
    rule: 'With infinitives after conjugated verbs, attach the pronoun to the infinitive. Querer conjugates, maquillarse stays infinitive with -se.'
  },
  { 
    setup: 'Nosotros / acostarse / tarde (conjugated)', 
    correct: 'Nosotros nos acostamos tarde.',
    options: ['Nosotros nos acostamos tarde.', 'Nosotros acostamos nos tarde.', 'Nosotros acostámonos tarde.'],
    rule: 'With conjugated verbs, pronoun goes BEFORE. Nosotros uses "nos". Note: acostarse stem-changes o→ue but not for nosotros!'
  },
];

const prepositionRules = [
  { 
    sentence: 'Antes de ___, me ducho.', 
    options: ['despertarme', 'despierto'],
    correct: 'despertarme',
    explanation: 'After "de" (preposition), use the INFINITIVE form with pronoun attached. Never conjugate after a preposition! Antes de + infinitive.'
  },
  { 
    sentence: 'Para ___ bien, necesito ocho horas.', 
    options: ['dormirme', 'duermo'],
    correct: 'dormirme',
    explanation: 'After "para" (preposition), use the INFINITIVE form with pronoun attached. Para + infinitive, never conjugated!'
  },
  { 
    sentence: 'Después de ___, me visto.', 
    options: ['bañarme', 'me baño'],
    correct: 'bañarme',
    explanation: 'After "de" (preposition), use the INFINITIVE form with pronoun attached. Después de + infinitive.'
  },
  { 
    sentence: 'Tengo que ___ temprano mañana.', 
    options: ['levantarme', 'me levanto'],
    correct: 'levantarme',
    explanation: 'After "tener que," use the INFINITIVE form with pronoun attached. Tener que + infinitive (this is similar to the preposition rule!).'
  },
];

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getConjugation(verb, subjectIndex) {
  const endings = verb.infinitive.endsWith('arse') ? arEndings : 
                  verb.infinitive.endsWith('erse') ? erEndings : irEndings;
  
  let stem = verb.stem;
  if (!verb.regular && verb.stemChange && subjectIndex !== 3 && subjectIndex !== 4) {
    // Stem changes don't apply to nosotros/vosotros
  }
  
  return pronouns[subjectIndex] + ' ' + stem + endings[subjectIndex];
}

function getConjugationExplanation(verb, subjectIndex) {
  const pronoun = pronouns[subjectIndex];
  const subject = subjects[subjectIndex];
  const endings = verb.infinitive.endsWith('arse') ? arEndings : 
                  verb.infinitive.endsWith('erse') ? erEndings : irEndings;
  const ending = endings[subjectIndex];
  
  let explanation = `For ${subject}, use pronoun "${pronoun}" + stem "${verb.stem}" + ending "-${ending}".`;
  
  if (verb.stemChange) {
    if (subjectIndex === 3 || subjectIndex === 4) {
      explanation += ` Note: ${verb.stemChange} stem change does NOT apply to nosotros/vosotros!`;
    } else {
      explanation += ` This verb has a ${verb.stemChange} stem change.`;
    }
  }
  
  return explanation;
}

export default function SpanishReflexiveGame() {
  const [screen, setScreen] = useState('menu');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [learnIndex, setLearnIndex] = useState(0);
  const [learnMode, setLearnMode] = useState('verbs');
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const generateQuizQuestions = () => {
    const questions = [];
    
    // Verb meaning questions
    const shuffledVerbs = shuffle(reflexiveVerbs).slice(0, 4);
    shuffledVerbs.forEach(verb => {
      const wrongAnswers = shuffle(reflexiveVerbs.filter(v => v.infinitive !== verb.infinitive))
        .slice(0, 3)
        .map(v => v.meaning);
      questions.push({
        type: 'meaning',
        question: `What does "${verb.infinitive}" mean?`,
        correct: verb.meaning,
        options: shuffle([verb.meaning, ...wrongAnswers]),
        explanation: verb.explanation,
        category: '📚 Vocabulary'
      });
    });

    // Pronoun matching
    const pronounQuestions = shuffle([0, 1, 2, 3, 4, 5]).slice(0, 3);
    pronounQuestions.forEach(idx => {
      const wrongPronouns = pronouns.filter((_, i) => i !== idx);
      questions.push({
        type: 'pronoun',
        question: `Which reflexive pronoun goes with "${subjects[idx]}"?`,
        correct: pronouns[idx],
        options: shuffle([pronouns[idx], ...shuffle(wrongPronouns).slice(0, 3)]),
        explanation: pronounExplanations[idx],
        category: '🔤 Pronouns'
      });
    });

    // Reflexive vs not reflexive
    const refVsNot = shuffle(reflexiveVsNot).slice(0, 3);
    refVsNot.forEach(item => {
      questions.push({
        type: 'reflexiveVsNot',
        question: item.sentence,
        correct: item.options[item.correct],
        options: item.options,
        explanation: item.explanation,
        category: '🤔 Reflexive or Not?'
      });
    });

    // Conjugation questions
    const conjVerbs = shuffle(reflexiveVerbs.filter(v => v.regular)).slice(0, 3);
    conjVerbs.forEach(verb => {
      const subjectIdx = Math.floor(Math.random() * 6);
      const correctConj = getConjugation(verb, subjectIdx);
      const wrongConjs = [0, 1, 2, 3, 4, 5]
        .filter(i => i !== subjectIdx)
        .slice(0, 3)
        .map(i => getConjugation(verb, i));
      
      questions.push({
        type: 'conjugation',
        question: `Conjugate "${verb.infinitive}" for "${subjects[subjectIdx]}"`,
        correct: correctConj,
        options: shuffle([correctConj, ...wrongConjs]),
        explanation: getConjugationExplanation(verb, subjectIdx),
        category: '✏️ Conjugation'
      });
    });

    // Pronoun placement questions
    const placementQs = shuffle(pronounPlacement).slice(0, 2);
    placementQs.forEach(item => {
      questions.push({
        type: 'placement',
        question: `Form the correct sentence: ${item.setup}`,
        correct: item.correct,
        options: shuffle(item.options),
        explanation: item.rule,
        category: '📍 Pronoun Placement'
      });
    });

    // Preposition rules
    const prepQs = shuffle(prepositionRules).slice(0, 2);
    prepQs.forEach(item => {
      questions.push({
        type: 'preposition',
        question: item.sentence,
        correct: item.correct,
        options: shuffle(item.options),
        explanation: item.explanation,
        category: '📝 Preposition Rules'
      });
    });

    return shuffle(questions);
  };

  const startQuiz = () => {
    setGameQuestions(generateQuizQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setSelectedAnswer(null);
    setTotalAnswered(0);
    setCorrectAnswers(0);
    setScreen('quiz');
  };

  const handleAnswer = (answer) => {
    if (feedback) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === gameQuestions[currentQuestion].correct;
    setTotalAnswered(prev => prev + 1);
    
    if (isCorrect) {
      const streakBonus = Math.min(streak * 5, 25);
      setScore(prev => prev + 10 + streakBonus);
      setStreak(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
      if (streak + 1 > bestStreak) setBestStreak(streak + 1);
      setFeedback({ 
        correct: true, 
        message: streak >= 2 ? `🔥 ${streak + 1} streak! +${10 + streakBonus} pts` : '✅ Correct! +10 pts',
        explanation: gameQuestions[currentQuestion].explanation
      });
    } else {
      setStreak(0);
      setFeedback({ 
        correct: false, 
        message: `❌ The answer was: ${gameQuestions[currentQuestion].correct}`,
        explanation: gameQuestions[currentQuestion].explanation
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setFeedback(null);
      setSelectedAnswer(null);
    } else {
      setScreen('results');
    }
  };

  const LearnScreen = () => {
    const learnContent = {
      verbs: {
        title: '📚 Reflexive Verbs & Meanings',
        items: reflexiveVerbs.map(v => ({
          front: v.infinitive,
          back: v.meaning,
          extra: v.stemChange ? `Stem change: ${v.stemChange}` : 'Regular',
          explanation: v.explanation
        }))
      },
      pronouns: {
        title: '🔤 Reflexive Pronouns',
        items: subjects.map((s, i) => ({
          front: s,
          back: pronouns[i],
          extra: `Example: ${s} ${pronouns[i]} levanto`,
          explanation: pronounExplanations[i]
        }))
      },
      rules: {
        title: '📝 Key Rules',
        items: [
          { front: 'Pronoun with conjugated verb', back: 'Pronoun goes BEFORE the verb', extra: 'Yo ME levanto temprano.', explanation: 'When the verb is conjugated (changed to match the subject), put the reflexive pronoun right before it.' },
          { front: 'Pronoun with infinitive', back: 'Pronoun attaches to END of infinitive', extra: 'Voy a levantarME.', explanation: 'When using an infinitive (unconjugated -ar/-er/-ir form), attach the pronoun to the end of the infinitive.' },
          { front: 'After "para" or "de"', back: 'Use INFINITIVE (never conjugated)', extra: 'Antes de acostarME, leo.', explanation: 'Prepositions like para, de, antes de, después de are ALWAYS followed by infinitives, never conjugated verbs!' },
          { front: 'Reflexive vs Not Reflexive', back: 'Reflexive = action to YOURSELF', extra: 'Me lavo (I wash myself) vs. Lavo el carro (I wash the car)', explanation: 'Use reflexive when the action reflects back to the subject. Ask: "Is the subject doing this to themselves?"' },
          { front: 'Two verbs together', back: 'Only the FIRST verb conjugates', extra: 'Quiero acostarme (NOT: Quiero me acuesto)', explanation: 'When you have two verbs, conjugate the first one and leave the second as an infinitive with the pronoun attached.' },
        ]
      }
    };

    const content = learnContent[learnMode];
    const currentCard = content.items[learnIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 p-4">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={() => setScreen('menu')}
            className="mb-4 text-white/80 hover:text-white flex items-center gap-2"
          >
            ← Back to Menu
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-4 text-center">{content.title}</h2>
          
          <div className="flex gap-2 mb-4 justify-center flex-wrap">
            {Object.keys(learnContent).map(mode => (
              <button
                key={mode}
                onClick={() => { setLearnMode(mode); setLearnIndex(0); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  learnMode === mode 
                    ? 'bg-white text-indigo-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl min-h-72 flex flex-col justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800 mb-4">{currentCard.front}</p>
              <div className="border-t-2 border-dashed border-gray-200 my-4"></div>
              <p className="text-2xl text-indigo-600 font-medium mb-2">{currentCard.back}</p>
              <p className="text-sm text-gray-500 italic mb-3">{currentCard.extra}</p>
              <div className="bg-blue-50 rounded-xl p-3 mt-4">
                <p className="text-sm text-blue-800">💡 {currentCard.explanation}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setLearnIndex(prev => Math.max(0, prev - 1))}
              disabled={learnIndex === 0}
              className="px-6 py-3 bg-white/20 text-white rounded-xl disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="text-white font-medium">
              {learnIndex + 1} / {content.items.length}
            </span>
            <button
              onClick={() => setLearnIndex(prev => Math.min(content.items.length - 1, prev + 1))}
              disabled={learnIndex === content.items.length - 1}
              className="px-6 py-3 bg-white/20 text-white rounded-xl disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PracticeScreen = () => {
    const [practiceQ, setPracticeQ] = useState(shuffle(routineQuestions)[0]);
    const [showExample, setShowExample] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const nextPractice = () => {
      setPracticeQ(shuffle(routineQuestions)[0]);
      setUserInput('');
      setShowExample(false);
      setSubmitted(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-4">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={() => setScreen('menu')}
            className="mb-4 text-white/80 hover:text-white flex items-center gap-2"
          >
            ← Back to Menu
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-2 text-center">💬 Routine Practice</h2>
          <p className="text-white/80 text-center mb-6">Answer questions about daily routines in complete Spanish sentences!</p>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <p className="text-xl font-bold text-gray-800 mb-2">{practiceQ.question}</p>
            <p className="text-sm text-gray-500 mb-4">({practiceQ.hint})</p>
            
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Write your answer in a complete Spanish sentence..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-400 focus:outline-none resize-none"
              rows={3}
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowExample(!showExample)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
              >
                {showExample ? 'Hide' : 'Show'} Example
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600"
              >
                Check Answer
              </button>
            </div>

            {showExample && (
              <div className="mt-4 p-4 bg-teal-50 rounded-xl border-2 border-teal-200">
                <p className="text-sm text-teal-600 font-medium">Example answer:</p>
                <p className="text-teal-800 font-medium">{practiceQ.exampleAnswer}</p>
              </div>
            )}

            {submitted && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <p className="text-sm text-blue-600 font-medium mb-2">✅ Self-check your answer:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Did you use the correct reflexive pronoun?</li>
                  <li>• Is the verb conjugated correctly?</li>
                  <li>• Is it a complete sentence?</li>
                  <li>• Does the pronoun match the subject?</li>
                </ul>
              </div>
            )}

            <button
              onClick={nextPractice}
              className="w-full mt-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold hover:from-teal-600 hover:to-cyan-600"
            >
              Next Question →
            </button>
          </div>

          <div className="mt-6 bg-white/20 rounded-xl p-4">
            <p className="text-white font-medium mb-2">💡 Tips for answering:</p>
            <ul className="text-white/90 text-sm space-y-1">
              <li>• Start with the subject (Yo, Mi mamá, etc.)</li>
              <li>• Add the reflexive pronoun before the conjugated verb</li>
              <li>• Include time expressions when relevant (a las siete, por la mañana)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 p-4 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🇪🇸 Spanish II</h1>
          <h2 className="text-2xl text-white/90">Reflexive Verbs Master</h2>
          {bestStreak > 0 && (
            <p className="text-white/70 mt-2">🏆 Best Streak: {bestStreak}</p>
          )}
        </div>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => setScreen('learn')}
            className="w-full py-4 px-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📚</span>
              <div className="text-left">
                <p className="font-bold text-gray-800">Learn</p>
                <p className="text-sm text-gray-500">Study flashcards & rules</p>
              </div>
            </div>
          </button>

          <button
            onClick={startQuiz}
            className="w-full py-4 px-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎯</span>
              <div className="text-left">
                <p className="font-bold text-gray-800">Challenge Quiz</p>
                <p className="text-sm text-gray-500">Test all concepts with points</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setScreen('practice')}
            className="w-full py-4 px-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">💬</span>
              <div className="text-left">
                <p className="font-bold text-gray-800">Routine Practice</p>
                <p className="text-sm text-gray-500">Answer questions in Spanish</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-white/80 text-sm text-center max-w-sm">
          <p>Covers: verb meanings, conjugation, pronoun placement, reflexive vs. non-reflexive, preposition rules, and routine responses!</p>
        </div>
      </div>
    );
  }

  if (screen === 'learn') {
    return <LearnScreen />;
  }

  if (screen === 'practice') {
    return <PracticeScreen />;
  }

  if (screen === 'results') {
    const percentage = Math.round((correctAnswers / totalAnswered) * 100);
    const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';
    const emoji = percentage >= 90 ? '🌟' : percentage >= 80 ? '🎉' : percentage >= 70 ? '👍' : percentage >= 60 ? '📚' : '💪';

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 p-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full text-center">
          <p className="text-6xl mb-4">{emoji}</p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          
          <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl p-4 my-6">
            <p className="text-5xl font-bold text-indigo-600">{score}</p>
            <p className="text-gray-600">Total Points</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-gray-800">{correctAnswers}/{totalAnswered}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-gray-800">{percentage}%</p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-gray-800">{grade}</p>
              <p className="text-xs text-gray-500">Grade</p>
            </div>
          </div>

          {bestStreak > 0 && (
            <p className="text-indigo-600 font-medium mb-4">🔥 Best Streak: {bestStreak}</p>
          )}

          <div className="space-y-3">
            <button
              onClick={startQuiz}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-blue-600"
            >
              Play Again
            </button>
            <button
              onClick={() => setScreen('menu')}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  const q = gameQuestions[currentQuestion];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setScreen('menu')}
            className="text-white/80 hover:text-white"
          >
            ← Exit
          </button>
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">🎯 {score} pts</span>
            {streak >= 2 && <span className="text-orange-300 font-medium">🔥 {streak}</span>}
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-white/20 rounded-full h-2 mb-6">
          <div 
            className="bg-white rounded-full h-2 transition-all"
            style={{ width: `${((currentQuestion + 1) / gameQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <span className="text-xs font-medium text-indigo-500 bg-indigo-100 px-3 py-1 rounded-full">
            {q.category}
          </span>
          <p className="text-sm text-gray-500 mt-4 mb-2">Question {currentQuestion + 1} of {gameQuestions.length}</p>
          <h3 className="text-xl font-bold text-gray-800 mb-6">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                className={`w-full p-4 rounded-xl text-left font-medium transition ${
                  feedback
                    ? option === q.correct
                      ? 'bg-green-100 border-2 border-green-500 text-green-700'
                      : selectedAnswer === option
                        ? 'bg-red-100 border-2 border-red-500 text-red-700'
                        : 'bg-gray-50 text-gray-400'
                    : 'bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 border-2 border-transparent text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`mt-4 p-4 rounded-xl ${feedback.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-medium ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>
                {feedback.message}
              </p>
              {feedback.explanation && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">💡 Why? </span>
                    {feedback.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {feedback && (
            <button
              onClick={nextQuestion}
              className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-blue-600"
            >
              {currentQuestion < gameQuestions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
