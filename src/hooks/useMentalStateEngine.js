import { useMemo } from 'react';
import useMoodData from './useMoodData';
import useAssessmentResults from './useAssessmentResults';
import useLocalStorage from './useLocalStorage';

/**
 * Mental State Engine — Analyzes user data to determine current mental state,
 * confidence level, and recommended intervention type.
 * 
 * This is the "brain" of the adaptive system. It transforms raw data into
 * actionable intelligence that powers the intervention system, daily plan,
 * and insight layer.
 * 
 * States: stable | low | anxious | burnout-risk | crisis
 */
export default function useMentalStateEngine() {
  const { entries: moodEntries, trends } = useMoodData();
  const { getLatestResult } = useAssessmentResults();
  const [followupData] = useLocalStorage('followup_data', []);
  const [habitData] = useLocalStorage('habit_data', { sleep: [] });

  const analysis = useMemo(() => {
    const signals = [];
    let state = 'stable';
    let confidence = 0;
    let dataPoints = 0;
    const reasons = [];

    // --- Analyze mood entries (last 7 days) ---
    const recentMoods = moodEntries
      .filter((e) => new Date(e.createdAt) > new Date(Date.now() - 7 * 86400000))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (recentMoods.length > 0) {
      dataPoints += recentMoods.length;
      const avgMood = recentMoods.reduce((s, e) => s + e.mood, 0) / recentMoods.length;
      const avgStress = recentMoods.reduce((s, e) => s + (e.stress || 0), 0) / recentMoods.length;
      const avgAnxiety = recentMoods.reduce((s, e) => s + (e.anxiety || 0), 0) / recentMoods.length;
      const avgEnergy = recentMoods.reduce((s, e) => s + (e.energy || 5), 0) / recentMoods.length;

      // Check consecutive low mood days
      const lowMoodDays = recentMoods.filter((e) => e.mood <= 3).length;
      const highStressDays = recentMoods.filter((e) => (e.stress || 0) >= 7).length;
      const highAnxietyDays = recentMoods.filter((e) => (e.anxiety || 0) >= 7).length;

      if (lowMoodDays >= 3) {
        signals.push({ type: 'low', weight: 3, reason: `Low mood reported for ${lowMoodDays} of last ${recentMoods.length} days` });
        reasons.push(`Your mood has been low for ${lowMoodDays} recent entries`);
      }

      if (highStressDays >= 3) {
        signals.push({ type: 'burnout-risk', weight: 2, reason: `High stress for ${highStressDays} days` });
        reasons.push(`Stress has been elevated for ${highStressDays} recent entries`);
      }

      if (highAnxietyDays >= 2) {
        signals.push({ type: 'anxious', weight: 2, reason: `High anxiety for ${highAnxietyDays} days` });
        reasons.push(`Anxiety has been high for ${highAnxietyDays} recent entries`);
      }

      if (avgEnergy <= 3) {
        signals.push({ type: 'burnout-risk', weight: 1, reason: 'Consistently low energy' });
        reasons.push('Your energy levels have been low');
      }

      if (avgMood >= 6 && avgStress <= 4) {
        signals.push({ type: 'stable', weight: 2, reason: 'Good mood, manageable stress' });
      }
    }

    // --- Analyze assessment results ---
    const latestMental = getLatestResult('mental-health-screening');
    const latestStress = getLatestResult('stress-level-analyzer');
    const latestSleep = getLatestResult('sleep-quality-analyzer');

    if (latestMental) {
      dataPoints += 1;
      if (latestMental.level === 'high') {
        signals.push({ type: 'crisis', weight: 3, reason: 'High risk on mental health screening' });
        reasons.push('Your mental health screening showed high risk');
      } else if (latestMental.level === 'moderate') {
        signals.push({ type: 'low', weight: 1, reason: 'Moderate risk on mental health screening' });
        reasons.push('Your mental health screening showed moderate concerns');
      }
    }

    if (latestStress) {
      dataPoints += 1;
      if (latestStress.level === 'high') {
        signals.push({ type: 'anxious', weight: 2, reason: 'High stress assessment' });
        reasons.push('Your stress assessment indicated high stress');
      }
    }

    if (latestSleep) {
      dataPoints += 1;
      if (latestSleep.level === 'high') {
        signals.push({ type: 'burnout-risk', weight: 1, reason: 'Poor sleep quality' });
        reasons.push('Your sleep quality assessment showed poor sleep');
      }
    }

    // --- Determine state from weighted signals ---
    const statePriority = ['crisis', 'burnout-risk', 'anxious', 'low', 'stable'];
    const stateWeights = {};
    signals.forEach((s) => {
      stateWeights[s.type] = (stateWeights[s.type] || 0) + s.weight;
    });

    for (const s of statePriority) {
      if ((stateWeights[s] || 0) >= 2) {
        state = s;
        break;
      }
    }

    // --- Calculate confidence ---
    confidence = Math.min(100, Math.round((dataPoints / 8) * 100));

    // --- Determine recommended intervention ---
    const interventionMap = {
      'crisis': 'low',         // gentle, not productivity
      'burnout-risk': 'overwhelmed',
      'anxious': 'anxious',
      'low': 'low',
      'stable': null,
    };

    // --- Recovery mode detection (Failure Handling Logic) ---
    const isRecoveryMode = state === 'crisis' || state === 'burnout-risk' ||
      (recentMoods.length >= 3 && recentMoods.slice(0, 3).every((e) => e.mood <= 3));

    // --- Generate adaptive daily plan ---
    const dailyPlan = generateDailyPlan(state, isRecoveryMode, reasons);

    return {
      state,
      stateLabel: getStateLabel(state),
      confidence,
      reasons,
      recommendedIntervention: interventionMap[state],
      isRecoveryMode,
      dailyPlan,
      dataPoints,
      signals,
    };
  }, [moodEntries, getLatestResult, followupData, habitData]);

  return analysis;
}

function getStateLabel(state) {
  const labels = {
    stable: 'You\'re doing well',
    low: 'You might be struggling',
    anxious: 'You seem stressed or anxious',
    'burnout-risk': 'You may be heading toward burnout',
    crisis: 'You need support right now',
  };
  return labels[state] || 'Unknown';
}

function generateDailyPlan(state, isRecoveryMode, reasons) {
  if (isRecoveryMode) {
    // STOP suggesting productivity — switch to recovery
    return [
      { type: 'regulation', icon: '🫁', title: 'Breathing Exercise', description: 'Do 3 rounds of 4-7-8 breathing to calm your nervous system', link: '/toolkit' },
      { type: 'recovery', icon: '📝', title: 'Express Your Feelings', description: 'Write for 5 minutes about what\'s on your mind — no filter needed', link: '/journal' },
      { type: 'recovery', icon: '🌿', title: 'Rest & Recover', description: 'Take a 20-minute break. No screens, no tasks. Just rest.', link: null },
    ];
  }

  const plans = {
    stable: [
      { type: 'regulation', icon: '🧘', title: 'Mindful Check-in', description: 'Log your mood and notice how you\'re feeling today', link: '/mood' },
      { type: 'productivity', icon: '🎯', title: 'Focus Session', description: 'Complete one 25-minute Pomodoro on your most important task', link: '/toolkit' },
      { type: 'recovery', icon: '📚', title: 'Learn Something', description: 'Read about a topic in the Knowledge Base to build awareness', link: '/conditions' },
    ],
    low: [
      { type: 'regulation', icon: '💙', title: 'Acknowledge & Breathe', description: 'It\'s okay to feel low. Do 3 minutes of slow breathing.', link: '/toolkit' },
      { type: 'productivity', icon: '📝', title: 'Gratitude Journaling', description: 'Write 3 small things you\'re grateful for — they can be tiny', link: '/journal' },
      { type: 'recovery', icon: '🌿', title: 'Gentle Movement', description: 'Take a 10-minute walk or do some light stretching', link: null },
    ],
    anxious: [
      { type: 'regulation', icon: '🫁', title: 'Box Breathing', description: 'Use the breathing tool for 4 rounds of box breathing (4-4-4-4)', link: '/toolkit' },
      { type: 'productivity', icon: '✅', title: 'Smallest Next Step', description: 'Pick your biggest worry and identify the one smallest action you can take', link: '/toolkit' },
      { type: 'recovery', icon: '🌙', title: 'Screen-Free Wind-Down', description: 'Stop all screens 30 minutes before bed tonight', link: null },
    ],
    'burnout-risk': [
      { type: 'regulation', icon: '🫁', title: 'Breathing + Grounding', description: 'Do the 5-4-3-2-1 grounding exercise to reconnect with the present', link: '/toolkit' },
      { type: 'recovery', icon: '📝', title: 'Brain Dump', description: 'Write everything on your mind in a thought dump — get it out of your head', link: '/journal' },
      { type: 'recovery', icon: '🛌', title: 'Prioritize Sleep', description: 'Tonight, go to bed 30 minutes earlier than usual', link: null },
    ],
    crisis: [
      { type: 'regulation', icon: '💙', title: 'You\'re Not Alone', description: 'Talk to someone you trust or use the emergency resources', link: '/emergency' },
      { type: 'recovery', icon: '🫁', title: 'Just Breathe', description: 'Do 5 minutes of guided breathing. Nothing else matters right now.', link: '/toolkit' },
      { type: 'recovery', icon: '🌿', title: 'Be Gentle with Yourself', description: 'Give yourself permission to rest today. You deserve it.', link: null },
    ],
  };

  return plans[state] || plans.stable;
}
