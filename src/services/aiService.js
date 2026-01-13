// AI Service for scoring, translation, and conversation
// This service handles all AI-powered features

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || '/api/ai';

// Score an open-ended response
export async function scoreResponse(userAnswer, expectedAnswer, context) {
  try {
    const response = await fetch(`${AI_ENDPOINT}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userAnswer,
        expectedAnswer,
        context,
      }),
    });
    return await response.json();
  } catch (error) {
    // Fallback to basic string matching if AI unavailable
    console.warn('AI scoring unavailable, using fallback:', error);
    return fallbackScore(userAnswer, expectedAnswer);
  }
}

// Basic fallback scoring when AI is unavailable
function fallbackScore(userAnswer, expectedAnswer) {
  const normalize = (str) => str.toLowerCase().trim().replace(/[.,!?¿¡]/g, '');
  const userNorm = normalize(userAnswer);
  const expectedNorm = normalize(expectedAnswer);
  
  if (userNorm === expectedNorm) {
    return { score: 100, feedback: '¡Perfecto! Perfect answer!' };
  }
  
  // Check for partial matches
  const userWords = userNorm.split(' ');
  const expectedWords = expectedNorm.split(' ');
  const matchedWords = userWords.filter(w => expectedWords.includes(w));
  const matchPercent = (matchedWords.length / expectedWords.length) * 100;
  
  if (matchPercent >= 80) {
    return { score: 90, feedback: '¡Muy bien! Almost perfect, minor differences.' };
  } else if (matchPercent >= 60) {
    return { score: 70, feedback: '¡Bien! Good effort, but some parts could be improved.' };
  } else if (matchPercent >= 40) {
    return { score: 50, feedback: 'Keep practicing! Review the correct answer.' };
  }
  
  return { score: 30, feedback: 'Not quite right. Study the example and try again!' };
}

// Translate text
export async function translateText(text, fromLang = 'es', toLang = 'en') {
  try {
    const response = await fetch(`${AI_ENDPOINT}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, fromLang, toLang }),
    });
    return await response.json();
  } catch (error) {
    console.warn('Translation unavailable:', error);
    return { translation: text, error: 'Translation service unavailable' };
  }
}

// Text-to-Speech
export function speakText(text, lang = 'es-ES') {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for learning
    utterance.pitch = 1;
    
    // Try to find a Spanish voice
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }
    
    window.speechSynthesis.speak(utterance);
    return true;
  }
  return false;
}

// Speech-to-Text (for speaking practice)
export function startSpeechRecognition(onResult, onError, lang = 'es-ES') {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError?.('Speech recognition not supported');
    return null;
  }
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = true;
  
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    const isFinal = event.results[event.results.length - 1].isFinal;
    onResult?.(transcript, isFinal);
  };
  
  recognition.onerror = (event) => {
    onError?.(event.error);
  };
  
  return recognition;
}

// AI Conversation for practice
export async function sendChatMessage(messages, context) {
  try {
    const response = await fetch(`${AI_ENDPOINT}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        context,
        systemPrompt: `You are a friendly Spanish tutor helping a student practice Spanish conversation. 
          Keep responses short and encouraging. Mix Spanish and English as appropriate for the student's level.
          Correct mistakes gently and provide helpful tips.`,
      }),
    });
    return await response.json();
  } catch (error) {
    console.warn('AI chat unavailable:', error);
    return {
      message: '¡Lo siento! The AI tutor is currently unavailable. Please try again later.',
      error: true,
    };
  }
}

// Provide writing feedback
export async function getWritingFeedback(text, prompt, criteria) {
  try {
    const response = await fetch(`${AI_ENDPOINT}/writing-feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, prompt, criteria }),
    });
    return await response.json();
  } catch (error) {
    console.warn('Writing feedback unavailable:', error);
    return fallbackWritingFeedback(text);
  }
}

function fallbackWritingFeedback(text) {
  const wordCount = text.trim().split(/\s+/).length;
  const hasSpanish = /[áéíóúñ¿¡]/i.test(text);
  
  return {
    score: Math.min(100, wordCount * 10 + (hasSpanish ? 20 : 0)),
    feedback: {
      grammar: 'AI feedback unavailable - basic check only',
      vocabulary: hasSpanish ? 'Good use of Spanish characters!' : 'Try including Spanish accents',
      suggestions: wordCount < 10 ? 'Try writing more to practice!' : 'Good length!',
    },
  };
}

export default {
  scoreResponse,
  translateText,
  speakText,
  startSpeechRecognition,
  sendChatMessage,
  getWritingFeedback,
};
