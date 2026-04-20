import { useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Hook for managing mood entries with history, trends, and pattern detection.
 */
export default function useMoodData() {
  const [entries, setEntries] = useLocalStorage('mood_entries', []);

  const addMoodEntry = useCallback(
    (entry) => {
      const newEntry = {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setEntries((prev) => [...prev, newEntry]);
      return newEntry;
    },
    [setEntries]
  );

  const deleteMoodEntry = useCallback(
    (id) => {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    },
    [setEntries]
  );

  // Get entries for last N days
  const getRecentEntries = useCallback(
    (days = 7) => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return entries
        .filter((e) => new Date(e.createdAt) >= cutoff)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    },
    [entries]
  );

  // Compute mood trends
  const trends = useMemo(() => {
    const recent = entries.slice(-14);
    if (recent.length < 2) return null;

    const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
    const secondHalf = recent.slice(Math.floor(recent.length / 2));

    const avg = (arr, key) => arr.reduce((s, e) => s + (e[key] || 0), 0) / arr.length;

    return {
      moodTrend: avg(secondHalf, 'mood') - avg(firstHalf, 'mood'),
      stressTrend: avg(secondHalf, 'stress') - avg(firstHalf, 'stress'),
      energyTrend: avg(secondHalf, 'energy') - avg(firstHalf, 'energy'),
      averageMood: avg(recent, 'mood'),
      averageStress: avg(recent, 'stress'),
      averageEnergy: avg(recent, 'energy'),
    };
  }, [entries]);

  // Detect emotional patterns (W: Emotional Pattern Detection)
  const patterns = useMemo(() => {
    if (entries.length < 5) return [];
    const detected = [];
    const recent = entries.slice(-14);

    // Detect consecutive low mood
    const lowMoodDays = recent.filter((e) => e.mood <= 3).length;
    if (lowMoodDays >= 3) {
      detected.push({
        type: 'warning',
        message: `You've reported low mood for ${lowMoodDays} of the last ${recent.length} days.`,
        suggestion: 'Consider talking to someone you trust or trying the guided breathing exercise.',
      });
    }

    // Detect high stress pattern
    const highStressDays = recent.filter((e) => (e.stress || 0) >= 7).length;
    if (highStressDays >= 3) {
      detected.push({
        type: 'alert',
        message: `High stress detected for ${highStressDays} recent entries.`,
        suggestion: 'Try the 7-Day Anxiety Reset program or use the stress management tools.',
      });
    }

    // Detect improving trend
    if (trends && trends.moodTrend > 1) {
      detected.push({
        type: 'positive',
        message: 'Your mood has been improving recently. Keep it up!',
        suggestion: 'Continue the practices that have been helping you.',
      });
    }

    return detected;
  }, [entries, trends]);

  return {
    entries,
    addMoodEntry,
    deleteMoodEntry,
    getRecentEntries,
    trends,
    patterns,
    totalEntries: entries.length,
  };
}
