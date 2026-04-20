import { useMemo } from 'react';
import useMoodData from './useMoodData';
import useAssessmentResults from './useAssessmentResults';
import useLocalStorage from './useLocalStorage';

/**
 * Behavioral Science Engine — Rule-based recommendation system.
 * Analyzes user data (mood, sleep, stress, assessments) and provides
 * personalized suggestions for tools and content.
 * 
 * This demonstrates a recommendation engine without requiring ML/AI backend.
 */
export default function useRecommendations() {
  const { trends, patterns, entries: moodEntries } = useMoodData();
  const { getLatestResult } = useAssessmentResults();
  const [sleepData] = useLocalStorage('habit_data', { sleep: [] });

  const recommendations = useMemo(() => {
    const recs = [];

    // Rule 1: Low mood + poor sleep → sleep + mood interventions
    const latestSleep = getLatestResult('sleep-quality-analyzer');
    if (trends && trends.averageMood < 5 && latestSleep && latestSleep.level !== 'low') {
      recs.push({
        id: 'sleep-mood',
        priority: 'high',
        title: 'Improve Your Sleep to Boost Mood',
        description: 'Your mood scores and sleep quality are both lower than ideal. Better sleep is one of the fastest ways to improve mood.',
        actions: [
          { label: 'Start 5-Day Sleep Program', link: '/programs/5-day-sleep-improvement' },
          { label: 'Read: Sleep Cycle Disruption', link: '/lifestyle/sleep-cycle-disruption' },
        ],
        icon: '🌙',
      });
    }

    // Rule 2: High stress → breathing + grounding tools
    const latestStress = getLatestResult('stress-level-analyzer');
    if ((trends && trends.averageStress > 6) || (latestStress && latestStress.level === 'high')) {
      recs.push({
        id: 'stress-tools',
        priority: 'high',
        title: 'Manage Your Stress',
        description: 'Your stress levels are elevated. Immediate relief tools can help.',
        actions: [
          { label: 'Breathing Exercise', link: '/toolkit' },
          { label: '7-Day Anxiety Reset', link: '/programs/7-day-anxiety-reset' },
          { label: 'Grounding Technique', link: '/emergency' },
        ],
        icon: '⚡',
      });
    }

    // Rule 3: Not journaling → suggest journaling
    if (moodEntries.length > 3 && !recs.find((r) => r.id === 'journal')) {
      recs.push({
        id: 'journal',
        priority: 'low',
        title: 'Try Journaling',
        description: 'Writing about your feelings has been shown to reduce stress and improve emotional clarity.',
        actions: [{ label: 'Start Journaling', link: '/journal' }],
        icon: '📝',
      });
    }

    // Rule 4: Pattern detection warnings (from useMoodData)
    patterns.forEach((p) => {
      if (p.type === 'warning' || p.type === 'alert') {
        recs.push({
          id: `pattern-${p.type}`,
          priority: 'high',
          title: 'Pattern Detected',
          description: p.message,
          actions: [{ label: p.suggestion, link: '/toolkit' }],
          icon: '⚠️',
        });
      }
    });

    // Rule 5: No assessments taken → suggest taking one
    if (!latestStress && !getLatestResult('mental-health-screening')) {
      recs.push({
        id: 'take-assessment',
        priority: 'medium',
        title: 'Get Your Baseline',
        description: 'Take a quick self-assessment to understand where you stand and get personalized recommendations.',
        actions: [{ label: 'Take Assessment', link: '/assessments' }],
        icon: '📊',
      });
    }

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return recs;
  }, [trends, patterns, moodEntries, getLatestResult, sleepData]);

  return recommendations;
}
