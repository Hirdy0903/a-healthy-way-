import { useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Hook for storing and analyzing assessment results.
 * Tracks results over time and generates insights.
 */
export default function useAssessmentResults() {
  const [results, setResults] = useLocalStorage('assessment_results', []);

  const addResult = useCallback(
    (result) => {
      const newResult = {
        ...result,
        id: Date.now().toString(),
        completedAt: new Date().toISOString(),
      };
      setResults((prev) => [...prev, newResult]);
      return newResult;
    },
    [setResults]
  );

  const getResultsByType = useCallback(
    (assessmentId) => {
      return results
        .filter((r) => r.assessmentId === assessmentId)
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    },
    [results]
  );

  const getLatestResult = useCallback(
    (assessmentId) => {
      const typeResults = getResultsByType(assessmentId);
      return typeResults.length > 0 ? typeResults[0] : null;
    },
    [getResultsByType]
  );

  // Compare latest result with previous one
  const getProgress = useCallback(
    (assessmentId) => {
      const typeResults = getResultsByType(assessmentId);
      if (typeResults.length < 2) return null;
      const latest = typeResults[0];
      const previous = typeResults[1];
      return {
        scoreDiff: latest.score - previous.score,
        levelChange: latest.level !== previous.level ? `${previous.level} → ${latest.level}` : 'no change',
        daysBetween: Math.floor((new Date(latest.completedAt) - new Date(previous.completedAt)) / (1000 * 60 * 60 * 24)),
      };
    },
    [getResultsByType]
  );

  // Crisis detection: if latest results show high risk across multiple assessments
  const crisisIndicators = useMemo(() => {
    const indicators = [];
    const latestMental = getLatestResult('mental-health-screening');
    const latestStress = getLatestResult('stress-level-analyzer');

    if (latestMental && latestMental.level === 'high') {
      indicators.push('High risk on mental health screening');
    }
    if (latestStress && latestStress.level === 'high') {
      indicators.push('High stress levels detected');
    }
    return indicators;
  }, [results, getLatestResult]);

  return {
    results,
    addResult,
    getResultsByType,
    getLatestResult,
    getProgress,
    crisisIndicators,
    totalAssessments: results.length,
  };
}
