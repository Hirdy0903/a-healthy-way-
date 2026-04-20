import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Follow-up System — Stores user responses to "Did this help?"
 * and uses history to adjust future suggestions.
 */
export default function useFollowup() {
  const [followups, setFollowups] = useLocalStorage('followup_data', []);

  const addFollowup = useCallback(
    (interventionType, stepId, helpful) => {
      const entry = {
        id: Date.now().toString(),
        interventionType,
        stepId,
        helpful,
        timestamp: new Date().toISOString(),
      };
      setFollowups((prev) => [...prev, entry]);
      return entry;
    },
    [setFollowups]
  );

  // Determine effectiveness of past interventions
  const getEffectiveness = useCallback(
    (interventionType) => {
      const relevant = followups.filter((f) => f.interventionType === interventionType);
      if (relevant.length === 0) return { helpful: 0, notHelpful: 0, rate: null };
      const helpful = relevant.filter((f) => f.helpful).length;
      return {
        helpful,
        notHelpful: relevant.length - helpful,
        rate: Math.round((helpful / relevant.length) * 100),
        total: relevant.length,
      };
    },
    [followups]
  );

  // Get most effective intervention type
  const getMostEffective = useCallback(() => {
    const types = ['anxious', 'low', 'overwhelmed', 'unfocused'];
    let best = null;
    let bestRate = -1;
    types.forEach((type) => {
      const eff = getEffectiveness(type);
      if (eff.total >= 2 && eff.rate > bestRate) {
        best = type;
        bestRate = eff.rate;
      }
    });
    return best;
  }, [getEffectiveness]);

  return { followups, addFollowup, getEffectiveness, getMostEffective };
}
