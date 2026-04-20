/**
 * Intervention Flows — Configurable step-by-step flow definitions
 * 
 * Each flow is data-driven: the UI renders steps from this config.
 * To add a new flow, just add an entry here — zero UI changes needed.
 */

const interventionFlows = {
  anxious: {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    color: 'from-amber-400 to-orange-500',
    softColor: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-700 dark:text-amber-300',
    steps: [
      {
        id: 'breathing',
        type: 'breathing',
        title: 'Let\'s slow things down',
        subtitle: 'Follow the breathing circle. Inhale when it grows, exhale when it shrinks.',
        config: { inhale: 4, hold: 4, exhale: 4, cycles: 3 },
      },
      {
        id: 'grounding',
        type: 'grounding',
        title: 'Now, let\'s ground you here',
        subtitle: 'Use your senses to connect with the present moment.',
        config: {
          senses: [
            { count: 5, sense: 'SEE', prompt: 'Look around. Name 5 things you can see.' },
            { count: 4, sense: 'TOUCH', prompt: 'Notice 4 things you can physically feel.' },
            { count: 3, sense: 'HEAR', prompt: 'Listen carefully. Name 3 sounds you hear.' },
            { count: 2, sense: 'SMELL', prompt: 'Name 2 things you can smell.' },
            { count: 1, sense: 'TASTE', prompt: 'Notice 1 thing you can taste.' },
          ],
        },
      },
      {
        id: 'reassurance',
        type: 'message',
        title: 'You\'re safe',
        subtitle: 'Anxiety is your body\'s alarm system. Sometimes it goes off when there\'s no real danger. What you\'re feeling is temporary — it will pass.',
        supportText: 'Your body is not broken. This is a normal stress response. You handled it just now by breathing through it.',
      },
      {
        id: 'check',
        type: 'followup',
        title: 'How are you feeling now?',
        subtitle: 'It\'s okay if you\'re not fully calm yet. Progress matters more than perfection.',
      },
    ],
  },

  low: {
    id: 'low',
    label: 'Low / Sad',
    emoji: '😔',
    color: 'from-blue-400 to-indigo-500',
    softColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-700 dark:text-blue-300',
    steps: [
      {
        id: 'acknowledge',
        type: 'message',
        title: 'It\'s okay to feel this way',
        subtitle: 'Sadness is not weakness. It means something matters to you. You don\'t need to force yourself to be positive right now.',
        supportText: 'You\'re here, and that takes strength. Let\'s take one tiny step together.',
      },
      {
        id: 'tiny-action',
        type: 'tiny-action',
        title: 'One small thing',
        subtitle: 'You don\'t need to fix everything. Just pick one tiny action:',
        actions: [
          { emoji: '💧', text: 'Drink a glass of water', detail: 'Hydration affects mood more than you think.' },
          { emoji: '🪟', text: 'Look out a window for 30 seconds', detail: 'Natural light triggers serotonin production.' },
          { emoji: '🎵', text: 'Play one song you love', detail: 'Music activates your brain\'s reward system.' },
          { emoji: '✋', text: 'Stretch your arms above your head', detail: 'Physical movement releases tension.' },
        ],
      },
      {
        id: 'journal',
        type: 'journal-prompt',
        title: 'Want to write it out?',
        subtitle: 'Sometimes putting feelings into words takes away their power. No pressure — this is optional.',
        prompt: 'Right now I feel... because...',
        optional: true,
      },
      {
        id: 'check',
        type: 'followup',
        title: 'Checking in',
        subtitle: 'How are you feeling after that? Even a tiny shift matters.',
      },
    ],
  },

  overwhelmed: {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    emoji: '🤯',
    color: 'from-violet-400 to-purple-500',
    softColor: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800',
    textColor: 'text-violet-700 dark:text-violet-300',
    steps: [
      {
        id: 'break-down',
        type: 'task-break',
        title: 'You don\'t need to do everything',
        subtitle: 'What is the ONE thing weighing on you most right now? Let\'s break it into one tiny first step.',
        placeholder: 'e.g., "I have so much homework" → First step: "Open the assignment page"',
      },
      {
        id: 'micro-timer',
        type: 'timer',
        title: 'Just 5 minutes',
        subtitle: 'You only need to try for 5 minutes. That\'s it. If you want to stop after that, you can.',
        config: { minutes: 5 },
      },
      {
        id: 'reassure',
        type: 'message',
        title: 'You just did something',
        subtitle: 'Even 5 minutes of action is better than hours of worrying. You proved to yourself that you can start.',
        supportText: 'Want to do another 5 minutes? Or is this enough for now? Both choices are valid.',
        showContinueOption: true,
      },
      {
        id: 'check',
        type: 'followup',
        title: 'How was that?',
        subtitle: 'Did breaking it down help reduce the overwhelm?',
      },
    ],
  },

  unfocused: {
    id: 'unfocused',
    label: 'Can\'t Focus',
    emoji: '🌫️',
    color: 'from-teal-400 to-cyan-500',
    softColor: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
    textColor: 'text-teal-700 dark:text-teal-300',
    steps: [
      {
        id: 'reset',
        type: 'distraction-reset',
        title: 'Let\'s reset',
        subtitle: 'Before we focus, let\'s clear the noise:',
        resetSteps: [
          'Close all unnecessary browser tabs',
          'Put your phone face-down or in another room',
          'Take 3 slow, deep breaths',
          'Choose ONE task to focus on (just one)',
        ],
      },
      {
        id: 'focus-timer',
        type: 'timer',
        title: 'Focus for 10 minutes',
        subtitle: 'That\'s all. 10 minutes of undistracted attention. You can do anything for 10 minutes.',
        config: { minutes: 10 },
      },
      {
        id: 'feedback',
        type: 'message',
        title: 'Nice work! 🎯',
        subtitle: 'You just completed a focused session. Your brain needed that reset.',
        supportText: 'Research shows that even short focused sessions build the "focus muscle" over time.',
        showContinueOption: true,
      },
      {
        id: 'check',
        type: 'followup',
        title: 'How did that feel?',
        subtitle: 'Were you able to maintain focus better after the reset?',
      },
    ],
  },
};

export default interventionFlows;
