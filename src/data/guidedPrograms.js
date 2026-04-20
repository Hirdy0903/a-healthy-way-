// Guided multi-day structured programs
const guidedPrograms = [
  {
    id: '7-day-anxiety-reset',
    title: '7-Day Anxiety Reset',
    subtitle: 'A week-long plan to reduce anxiety',
    icon: '🧘',
    color: 'from-teal-500 to-cyan-600',
    duration: '7 days',
    description: 'A structured program combining breathing, cognitive techniques, and lifestyle adjustments to significantly reduce anxiety levels over one week.',
    days: [
      { day: 1, title: 'Awareness Day', tasks: ['Complete the Stress Level Assessment to baseline your anxiety', 'Write down your top 3 anxiety triggers', 'Practice the 4-7-8 breathing exercise twice today (morning and evening)', 'Set a consistent bedtime for this week'] },
      { day: 2, title: 'Breathing Mastery', tasks: ['Practice box breathing (4-4-4-4) for 5 minutes in the morning', 'When you notice anxiety, pause and take 3 slow breaths before reacting', 'Reduce caffeine intake by half today', 'Journal: What situations triggered anxiety today?'] },
      { day: 3, title: 'Thought Challenge', tasks: ['Identify one anxious thought and write it down', 'Ask: Is this thought based on facts or assumptions?', 'Write a more balanced alternative thought', 'Do 20 minutes of physical exercise (walk, yoga, stretching)'] },
      { day: 4, title: 'Body Awareness', tasks: ['Practice a 10-minute body scan meditation', 'Notice where you hold tension (jaw, shoulders, stomach)', 'Do progressive muscle relaxation before bed', 'Limit social media to 30 minutes total today'] },
      { day: 5, title: 'Exposure Day', tasks: ['Do one small thing that makes you slightly anxious (speak up in class, make a phone call)', 'Rate your anxiety before (1-10) and after (1-10) — notice it was lower than expected', 'Practice gratitude: list 5 things you are grateful for', 'Take a 30-minute walk in nature'] },
      { day: 6, title: 'Social Connection', tasks: ['Have a genuine conversation with someone you trust about how you have been feeling', 'Do something fun and non-academic for at least 1 hour', 'Practice the 5-4-3-2-1 grounding technique', 'Go to bed 30 minutes earlier than usual'] },
      { day: 7, title: 'Integration & Reflection', tasks: ['Retake the Stress Level Assessment — compare to Day 1', 'Write a reflection: What techniques worked best for you?', 'Create a personal anxiety toolkit (3-5 go-to strategies)', 'Set goals for maintaining these practices going forward'] },
    ],
  },
  {
    id: '5-day-sleep-improvement',
    title: 'Improve Sleep in 5 Days',
    subtitle: 'Evidence-based sleep optimization',
    icon: '🌙',
    color: 'from-violet-500 to-purple-600',
    duration: '5 days',
    description: 'A 5-day program to reset your sleep habits using proven sleep science techniques. Each day builds on the previous one.',
    days: [
      { day: 1, title: 'Sleep Audit', tasks: ['Complete the Sleep Quality Assessment', 'Record your current bedtime and wake time', 'Remove all screens from your bedroom (or set up a charging station outside)', 'Set a fixed wake time for the next 5 days — do NOT change it'] },
      { day: 2, title: 'Light Management', tasks: ['Get 15 minutes of bright light within 30 minutes of waking', 'Enable blue light filter on all devices after 7 PM', 'Stop all screen use 60 minutes before your target bedtime', 'Create a wind-down routine: warm shower, reading, or light stretching'] },
      { day: 3, title: 'Caffeine & Stimulant Reset', tasks: ['No caffeine after 12 PM (noon) today', 'Replace afternoon coffee with herbal tea or water', 'Avoid heavy meals 3 hours before bedtime', 'Practice 5 minutes of body scan meditation in bed'] },
      { day: 4, title: 'Environment Optimization', tasks: ['Make your bedroom as dark as possible (blackout curtains or sleep mask)', 'Set room temperature to 65-68°F (18-20°C) if possible', 'Use earplugs or a white noise machine if your environment is noisy', 'If you cannot sleep after 20 minutes, get up and read until drowsy'] },
      { day: 5, title: 'Consolidation', tasks: ['Retake the Sleep Quality Assessment — compare to Day 1', 'Review which changes made the biggest difference', 'Commit to maintaining your fixed wake time for the next month', 'Write your personal "sleep rules" that you will follow going forward'] },
    ],
  },
  {
    id: 'beat-procrastination-plan',
    title: 'Beat Procrastination Plan',
    subtitle: '7-day action plan to build momentum',
    icon: '🚀',
    color: 'from-orange-500 to-amber-600',
    duration: '7 days',
    description: 'A practical plan for breaking procrastination patterns using behavioral science techniques. Focus on building small wins that create momentum.',
    days: [
      { day: 1, title: 'Clarity Day', tasks: ['List every task you are currently procrastinating on', 'For each task, write the emotion it triggers (boring, scary, overwhelming, unclear)', 'Choose the ONE most important task', 'Break it into sub-tasks of 15 minutes or less'] },
      { day: 2, title: 'Environment Design', tasks: ['Set up a distraction-free work space (clean desk, phone in another room)', 'Install a website blocker (Cold Turkey, Freedom) and block social media during study hours', 'Place your study materials out and visible before going to sleep', 'Complete one 25-minute Pomodoro session on your chosen task'] },
      { day: 3, title: 'Momentum Building', tasks: ['Complete two 25-minute Pomodoro sessions with 5-minute breaks', 'Use the 2-minute rule: immediately do any task that takes <2 minutes', 'At the end of the day, write tomorrow\'s #1 task on a sticky note and place it where you will see it', 'Reward yourself for completing your sessions (something you enjoy)'] },
      { day: 4, title: 'Emotional Management', tasks: ['When you feel the urge to procrastinate, set a timer for 10 minutes and just observe the feeling', 'Practice self-compassion: say "It is okay to find this task difficult"', 'Complete three Pomodoro sessions today', 'Journal: What emotions came up during your work? How did you handle them?'] },
      { day: 5, title: 'Accountability', tasks: ['Tell a friend or study partner your specific plan for today', 'Work alongside someone (body doubling) for at least one session', 'Complete two Pomodoro sessions minimum', 'End of day: message your accountability partner what you accomplished'] },
      { day: 6, title: 'Temptation Bundling', tasks: ['Pair your most procrastinated task with something enjoyable (music, favorite drink, cozy spot)', 'Use implementation intentions: "At [time], at [place], I will [task] for [duration]"', 'Complete three Pomodoro sessions with this approach', 'Notice how the task feels less aversive when bundled with pleasure'] },
      { day: 7, title: 'Systems Not Goals', tasks: ['Review the week: which strategies worked best for you?', 'Create a daily routine that includes your most effective anti-procrastination tools', 'Set up recurring calendar blocks for your most important study sessions', 'Write a commitment to yourself: your personal procrastination prevention plan'] },
    ],
  },
];

export default guidedPrograms;
