// Self-Assessment Quizzes
// Inspired by validated clinical instruments (PHQ-9, PSS, PSQI) adapted for student context

const assessments = [
  {
    id: 'mental-health-screening',
    title: 'Mental Health Screening',
    subtitle: 'General Mental Wellbeing Assessment',
    description: 'A 10-question screening inspired by the PHQ-9 and GAD-7 scales. This helps identify potential areas of concern in your mental health.',
    icon: '🧠',
    color: 'from-blue-500 to-indigo-600',
    duration: '5-7 minutes',
    disclaimer: 'This is a screening tool for educational purposes only. It is NOT a clinical diagnosis. Results should not replace professional medical or psychological evaluation. If you are in crisis, please contact emergency services or a helpline immediately.',
    questions: [
      {
        id: 1,
        text: 'Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 2,
        text: 'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 3,
        text: 'How often do you feel nervous, anxious, or on edge?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 4,
        text: 'How often do you find it difficult to stop or control worrying?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 5,
        text: 'How often do you have trouble concentrating on things like reading or studying?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 6,
        text: 'How often have you felt tired or had little energy?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 7,
        text: 'How often have you had trouble falling or staying asleep, or sleeping too much?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 8,
        text: 'How often have you felt bad about yourself or that you are a failure?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 9,
        text: 'How often do you have difficulty making decisions in your daily academic or personal life?',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 10,
        text: 'How confident do you feel about your ability to handle personal problems?',
        options: [
          { text: 'Very confident', score: 0 },
          { text: 'Somewhat confident', score: 1 },
          { text: 'Not very confident', score: 2 },
          { text: 'Not at all confident', score: 3 },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 7, level: 'low', label: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', description: 'Your responses suggest minimal mental health concerns. Continue your current wellness practices and stay aware of changes.', recommendations: ['Maintain your current healthy habits', 'Continue regular social connections', 'Practice preventive self-care', 'Consider periodic check-ins with yourself'] },
        { min: 8, max: 16, level: 'moderate', label: 'Moderate Risk', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', description: 'Your responses indicate some areas of concern that may benefit from attention. This is common among students, especially during stressful periods.', recommendations: ['Explore the coping strategies in our Knowledge Base', 'Consider starting a mood tracking habit', 'Try the breathing exercises in the Wellness Toolkit', 'Talk to a trusted friend, family member, or counselor', 'Monitor your symptoms over the next few weeks'] },
        { min: 17, max: 30, level: 'high', label: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', description: 'Your responses suggest significant mental health concerns that warrant professional attention. This is not a diagnosis, but we strongly encourage you to seek support.', recommendations: ['Please reach out to a counselor or mental health professional', 'Contact your university counseling center', 'If you are in crisis, use the Emergency resources in this app', 'Remember: seeking help is a sign of strength, not weakness', 'You deserve support — these feelings are valid and treatable'] },
      ],
    },
  },
  {
    id: 'stress-level-analyzer',
    title: 'Stress Level Analyzer',
    subtitle: 'Academic & Life Stress Assessment',
    description: 'Evaluate your current stress levels across academic, social, and personal domains. Based on the Perceived Stress Scale (PSS) adapted for students.',
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
    duration: '4-5 minutes',
    disclaimer: 'This tool provides a general indication of stress levels. It is not a clinical assessment. If you are experiencing severe stress, please consult a healthcare professional.',
    questions: [
      {
        id: 1,
        text: 'In the last month, how often have you felt unable to control the important things in your life?',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Almost never', score: 1 },
          { text: 'Sometimes', score: 2 },
          { text: 'Fairly often', score: 3 },
          { text: 'Very often', score: 4 },
        ],
      },
      {
        id: 2,
        text: 'How often have you felt overwhelmed by your academic workload?',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Almost never', score: 1 },
          { text: 'Sometimes', score: 2 },
          { text: 'Fairly often', score: 3 },
          { text: 'Very often', score: 4 },
        ],
      },
      {
        id: 3,
        text: 'How often have you felt confident about your ability to handle your personal problems?',
        options: [
          { text: 'Very often', score: 0 },
          { text: 'Fairly often', score: 1 },
          { text: 'Sometimes', score: 2 },
          { text: 'Almost never', score: 3 },
          { text: 'Never', score: 4 },
        ],
      },
      {
        id: 4,
        text: 'How often have you felt that things were going your way?',
        options: [
          { text: 'Very often', score: 0 },
          { text: 'Fairly often', score: 1 },
          { text: 'Sometimes', score: 2 },
          { text: 'Almost never', score: 3 },
          { text: 'Never', score: 4 },
        ],
      },
      {
        id: 5,
        text: 'How often have you found that you could not cope with all the things you had to do?',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Almost never', score: 1 },
          { text: 'Sometimes', score: 2 },
          { text: 'Fairly often', score: 3 },
          { text: 'Very often', score: 4 },
        ],
      },
      {
        id: 6,
        text: 'How often have you felt difficulties piling up so high that you could not overcome them?',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Almost never', score: 1 },
          { text: 'Sometimes', score: 2 },
          { text: 'Fairly often', score: 3 },
          { text: 'Very often', score: 4 },
        ],
      },
      {
        id: 7,
        text: 'How often have you been angered because of things outside your control?',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Almost never', score: 1 },
          { text: 'Sometimes', score: 2 },
          { text: 'Fairly often', score: 3 },
          { text: 'Very often', score: 4 },
        ],
      },
      {
        id: 8,
        text: 'How would you rate your overall stress level right now?',
        options: [
          { text: 'Very low', score: 0 },
          { text: 'Low', score: 1 },
          { text: 'Moderate', score: 2 },
          { text: 'High', score: 3 },
          { text: 'Very high', score: 4 },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 8, level: 'low', label: 'Low Stress', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', description: 'Your stress levels appear manageable. You seem to have effective coping strategies in place.', recommendations: ['Continue your current stress management practices', 'Share your strategies with peers who might benefit', 'Build stress resilience through regular exercise and sleep hygiene'] },
        { min: 9, max: 18, level: 'moderate', label: 'Moderate Stress', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', description: 'You are experiencing moderate stress, which is common among students but should be addressed before it escalates.', recommendations: ['Identify your top 3 stressors and address them proactively', 'Try the Pomodoro Timer for better time management', 'Practice the 4-7-8 breathing technique when feeling overwhelmed', 'Consider reducing non-essential commitments temporarily'] },
        { min: 19, max: 32, level: 'high', label: 'High Stress', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', description: 'Your stress levels are significantly elevated. This level of stress can impact your health, academics, and relationships if not addressed.', recommendations: ['Prioritize immediate self-care: sleep, nutrition, and rest', 'Talk to a counselor or trusted mentor about your workload', 'Consider using our guided breathing and journaling tools daily', 'Evaluate whether you can defer or drop any commitments', 'Seeking help is important — you do not have to manage this alone'] },
      ],
    },
  },
  {
    id: 'sleep-quality-analyzer',
    title: 'Sleep Quality Analyzer',
    subtitle: 'Sleep Habits & Quality Assessment',
    description: 'Evaluate your sleep patterns and quality. Based on the Pittsburgh Sleep Quality Index (PSQI) adapted for student lifestyles.',
    icon: '🌙',
    color: 'from-violet-500 to-purple-600',
    duration: '4-5 minutes',
    disclaimer: 'This assessment provides a general overview of your sleep habits. It is not a clinical sleep study. For persistent sleep problems, consult a healthcare provider.',
    questions: [
      {
        id: 1,
        text: 'How long does it typically take you to fall asleep at night?',
        options: [
          { text: 'Less than 15 minutes', score: 0 },
          { text: '15-30 minutes', score: 1 },
          { text: '30-60 minutes', score: 2 },
          { text: 'More than 60 minutes', score: 3 },
        ],
      },
      {
        id: 2,
        text: 'How many hours of actual sleep do you get on a typical night?',
        options: [
          { text: '7-9 hours', score: 0 },
          { text: '6-7 hours', score: 1 },
          { text: '5-6 hours', score: 2 },
          { text: 'Less than 5 hours', score: 3 },
        ],
      },
      {
        id: 3,
        text: 'How often do you wake up during the night?',
        options: [
          { text: 'Rarely or never', score: 0 },
          { text: 'Once a week', score: 1 },
          { text: 'Several times a week', score: 2 },
          { text: 'Almost every night', score: 3 },
        ],
      },
      {
        id: 4,
        text: 'How consistent is your sleep schedule (same bedtime and wake time)?',
        options: [
          { text: 'Very consistent (within 30 min)', score: 0 },
          { text: 'Somewhat consistent (within 1 hour)', score: 1 },
          { text: 'Inconsistent (varies by 2+ hours)', score: 2 },
          { text: 'Very inconsistent (completely irregular)', score: 3 },
        ],
      },
      {
        id: 5,
        text: 'How often do you use electronic devices (phone, laptop) within 30 minutes of bedtime?',
        options: [
          { text: 'Rarely or never', score: 0 },
          { text: 'A few times a week', score: 1 },
          { text: 'Most nights', score: 2 },
          { text: 'Every night', score: 3 },
        ],
      },
      {
        id: 6,
        text: 'How rested do you typically feel when you wake up?',
        options: [
          { text: 'Well-rested and energized', score: 0 },
          { text: 'Somewhat rested', score: 1 },
          { text: 'Still tired', score: 2 },
          { text: 'Exhausted despite sleeping', score: 3 },
        ],
      },
      {
        id: 7,
        text: 'How often do you consume caffeine after 2 PM?',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Occasionally', score: 1 },
          { text: 'Frequently', score: 2 },
          { text: 'Daily', score: 3 },
        ],
      },
      {
        id: 8,
        text: 'How often do you take naps during the day?',
        options: [
          { text: 'Rarely (once a week or less)', score: 0 },
          { text: 'Sometimes (2-3 times a week)', score: 1 },
          { text: 'Often (4-5 times a week)', score: 2 },
          { text: 'Daily or more', score: 3 },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 6, level: 'low', label: 'Good Sleep Quality', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', description: 'Your sleep habits appear healthy. Maintaining these patterns will support your mental health and academic performance.', recommendations: ['Continue your consistent sleep schedule', 'Your sleep hygiene practices are working well', 'Consider sharing your sleep strategies with friends who struggle'] },
        { min: 7, max: 14, level: 'moderate', label: 'Fair Sleep Quality', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', description: 'Your sleep quality could be improved. Several factors may be affecting your rest and daytime functioning.', recommendations: ['Set a consistent bedtime alarm as a reminder to start winding down', 'Try a "digital sunset" — no screens 30-60 minutes before bed', 'Move your caffeine cutoff to before 2 PM', 'Create a relaxing pre-sleep routine (reading, stretching, journaling)'] },
        { min: 15, max: 24, level: 'high', label: 'Poor Sleep Quality', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', description: 'Your sleep quality is significantly impaired. Poor sleep directly impacts mood, concentration, memory, and immune function.', recommendations: ['Prioritize establishing a non-negotiable sleep schedule immediately', 'Remove electronic devices from your bedroom if possible', 'See our Sleep Cycle Disruption article for detailed science and strategies', 'If problems persist beyond 3 weeks of improved habits, consult a healthcare provider', 'Consider whether an underlying condition (anxiety, depression) is affecting your sleep'] },
      ],
    },
  },
];

export default assessments;
