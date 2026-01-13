// Unit 1: Reflexive Verbs & Daily Routines - Complete Content

export const reflexiveVerbs = [
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

export const pronouns = ['me', 'te', 'se', 'nos', 'os', 'se'];
export const subjects = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'];
export const arEndings = ['o', 'as', 'a', 'amos', 'áis', 'an'];
export const erEndings = ['o', 'es', 'e', 'emos', 'éis', 'en'];
export const irEndings = ['o', 'es', 'e', 'imos', 'ís', 'en'];

export const pronounExplanations = {
  0: 'YO always uses ME. Think: "I wash MYSELF" = Yo ME lavo.',
  1: 'TÚ always uses TE. Think: "You wash YOURSELF" = Tú TE lavas.',
  2: 'ÉL/ELLA/USTED uses SE. Think: "He/She washes HIMSELF/HERSELF" = Él SE lava.',
  3: 'NOSOTROS uses NOS. Think: "We wash OURSELVES" = Nosotros NOS lavamos.',
  4: 'VOSOTROS uses OS. Think: "You all wash YOURSELVES" = Vosotros OS laváis.',
  5: 'ELLOS/ELLAS/USTEDES uses SE. Think: "They wash THEMSELVES" = Ellos SE lavan.'
};

export const routineQuestions = [
  { question: '¿A qué hora te levantas?', hint: 'What time do you get up?', exampleAnswer: 'Me levanto a las siete de la mañana.' },
  { question: '¿A qué hora te acuestas?', hint: 'What time do you go to bed?', exampleAnswer: 'Me acuesto a las diez de la noche.' },
  { question: '¿Te duchas por la mañana o por la noche?', hint: 'Do you shower in the morning or at night?', exampleAnswer: 'Me ducho por la mañana.' },
  { question: '¿Cómo se llama tu mejor amigo/a?', hint: 'What is your best friend\'s name?', exampleAnswer: 'Mi mejor amigo se llama Carlos.' },
  { question: '¿A qué hora se despierta tu mamá?', hint: 'What time does your mom wake up?', exampleAnswer: 'Mi mamá se despierta a las seis.' },
  { question: '¿Te cepillas los dientes después de comer?', hint: 'Do you brush your teeth after eating?', exampleAnswer: 'Sí, me cepillo los dientes después de comer.' },
];

export const reflexiveVsNot = [
  { sentence: 'Yo ___ las manos antes de comer.', options: ['lavo', 'me lavo'], correct: 1, explanation: 'You wash YOUR OWN hands → reflexive (me lavo). The action reflects back to yourself!' },
  { sentence: 'Yo ___ el carro los sábados.', options: ['lavo', 'me lavo'], correct: 0, explanation: 'You wash THE CAR (not yourself) → not reflexive (lavo). The action goes to something else, not back to you.' },
  { sentence: 'María ___ a las ocho.', options: ['despierta', 'se despierta'], correct: 1, explanation: 'María wakes HERSELF up → reflexive (se despierta). She\'s doing the action to herself.' },
  { sentence: 'María ___ a su hermano.', options: ['despierta', 'se despierta'], correct: 0, explanation: 'María wakes up HER BROTHER → not reflexive (despierta). She\'s doing the action to someone else.' },
  { sentence: 'Los niños ___ en la piscina.', options: ['bañan', 'se bañan'], correct: 1, explanation: 'The kids bathe THEMSELVES → reflexive (se bañan). They\'re bathing their own bodies.' },
  { sentence: 'La mamá ___ al bebé.', options: ['baña', 'se baña'], correct: 0, explanation: 'Mom bathes THE BABY → not reflexive (baña). She\'s bathing someone else, not herself.' },
  { sentence: 'Yo ___ temprano los lunes.', options: ['acuesto', 'me acuesto'], correct: 1, explanation: 'You put YOURSELF to bed → reflexive (me acuesto). You\'re laying yourself down.' },
  { sentence: 'Ella ___ elegante para la fiesta.', options: ['viste', 'se viste'], correct: 1, explanation: 'She dresses HERSELF → reflexive (se viste). She\'s putting clothes on her own body.' },
];

export const pronounPlacement = [
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

export const prepositionRules = [
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

export const studyGuide = {
  title: 'Reflexive Verbs Study Guide',
  sections: [
    {
      title: 'What are Reflexive Verbs?',
      content: `Reflexive verbs are actions you do TO YOURSELF. The action "reflects" back to the subject.

Example: "lavarse" = to wash oneself
- Yo me lavo = I wash myself
- Tú te lavas = You wash yourself

The "-se" at the end tells you it's reflexive!`,
    },
    {
      title: 'Reflexive Pronouns',
      content: `Each subject has a matching pronoun:
- yo → me
- tú → te  
- él/ella/usted → se
- nosotros → nos
- vosotros → os
- ellos/ellas/ustedes → se`,
    },
    {
      title: 'Where Does the Pronoun Go?',
      content: `With conjugated verbs: BEFORE the verb
- Yo ME levanto temprano.

With infinitives: ATTACHED to the end
- Voy a levantarME.

After prepositions: Always use infinitive
- Antes de acostarME, leo un libro.`,
    },
    {
      title: 'Reflexive vs Non-Reflexive',
      content: `The KEY question: Is the subject doing the action to THEMSELVES?

YES → Use reflexive:
- Me lavo las manos. (I wash MY hands)

NO → Don't use reflexive:
- Lavo el carro. (I wash THE CAR)`,
    },
  ],
};

export default {
  reflexiveVerbs,
  pronouns,
  subjects,
  arEndings,
  erEndings,
  irEndings,
  pronounExplanations,
  routineQuestions,
  reflexiveVsNot,
  pronounPlacement,
  prepositionRules,
  studyGuide,
};
