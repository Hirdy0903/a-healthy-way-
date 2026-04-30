const flows = {
  anxietyFlow: {
    id: 'anxietyFlow',
    steps: [
      {
        id: 'a1',
        type: 'text',
        content: 'Let\'s slow things down together.',
      },
      {
        id: 'a2',
        type: 'exercise',
        exerciseType: 'breathing',
        content: 'Follow the circle. Inhale for 4, hold for 4, exhale for 4, hold for 4.',
      },
      {
        id: 'a3',
        type: 'exercise',
        exerciseType: 'grounding',
        content: 'Look around you. Find 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 good thing about yourself.',
      },
      {
        id: 'a4',
        type: 'text',
        content: 'You did great. Your nervous system is starting to settle. Remember, this feeling is temporary and you are safe.',
      },
      {
        id: 'a5',
        type: 'input',
        content: 'Are you feeling a little better?',
        options: ['Yes', 'No'],
      }
    ]
  },
  lowMoodFlow: {
    id: 'lowMoodFlow',
    steps: [
      {
        id: 'l1',
        type: 'text',
        content: 'It is completely okay to feel this way. I hear you, and your feelings are valid.',
      },
      {
        id: 'l2',
        type: 'text',
        content: 'Try one small thing right now: take a sip of water or stand up and stretch for 10 seconds.',
      },
      {
        id: 'l3',
        type: 'input',
        content: 'Would you like to write down what\'s bothering you? Sometimes getting it out helps.',
        inputType: 'textarea',
        placeholder: 'I\'m feeling down because...'
      },
      {
        id: 'l4',
        type: 'text',
        content: 'Thank you for sharing that. I\'m proud of you for showing up for yourself today.',
      }
    ]
  },
  overwhelmedFlow: {
    id: 'overwhelmedFlow',
    steps: [
      {
        id: 'o1',
        type: 'input',
        content: 'What is the absolute biggest thing on your mind right now?',
        inputType: 'textarea',
        placeholder: 'Right now I am stressed about...'
      },
      {
        id: 'o2',
        type: 'text',
        content: 'Okay. Let\'s put everything else on pause. Break that one thing into the smallest possible step.',
      },
      {
        id: 'o3',
        type: 'timer',
        content: 'Let\'s focus on that single tiny step for just 5 minutes. Ready?',
        duration: 300, // 5 minutes in seconds
      },
      {
        id: 'o4',
        type: 'text',
        content: 'Great job. You took the first step, and that is usually the hardest part.',
      }
    ]
  },
  focusFlow: {
    id: 'focusFlow',
    steps: [
      {
        id: 'f1',
        type: 'text',
        content: 'Let\'s do a quick distraction reset. Close your eyes, take a deep breath, and let go of whatever you were just looking at.',
      },
      {
        id: 'f2',
        type: 'timer',
        content: '10 minutes of pure focus. No tabs, no phone. Just one task.',
        duration: 600, // 10 minutes
      },
      {
        id: 'f3',
        type: 'text',
        content: 'Time is up! See? You can do this. Keep this momentum going.',
      }
    ]
  }
};

export const topicToFlowMap = {
  relationships: 'lowMoodFlow',
  career: 'overwhelmedFlow',
  academic: 'overwhelmedFlow',
  self: 'overwhelmedFlow',
  anxiety: 'anxietyFlow',
  low_mood: 'lowMoodFlow',
  identity: 'lowMoodFlow',
};

export const getFlowForTopic = (topicId) => {
  const flowId = topicToFlowMap[topicId];
  return flows[flowId] || flows.anxietyFlow; // default fallback
};

export default flows;
