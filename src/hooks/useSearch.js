import { useMemo, useCallback } from 'react';
import conditions from '@/data/conditions';
import lifestyleFactors from '@/data/lifestyleFactors';
import studentProblems from '@/data/studentProblems';

/**
 * Hook for searching across all content types.
 * Returns filtered results grouped by category.
 */
export default function useSearch(query) {
  const search = useCallback(
    (searchQuery) => {
      if (!searchQuery || searchQuery.trim().length < 2) return { conditions: [], factors: [], problems: [], total: 0 };

      const q = searchQuery.toLowerCase().trim();

      const matchedConditions = conditions.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.definition.toLowerCase().includes(q) ||
          c.symptoms.some((s) => s.text.toLowerCase().includes(q)) ||
          c.copingMechanisms.some((cm) => cm.title.toLowerCase().includes(q) || cm.description.toLowerCase().includes(q))
      );

      const matchedFactors = lifestyleFactors.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.overview.toLowerCase().includes(q) ||
          f.recommendations.some((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
      );

      const matchedProblems = studentProblems.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.strategies.some((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
      );

      return {
        conditions: matchedConditions,
        factors: matchedFactors,
        problems: matchedProblems,
        total: matchedConditions.length + matchedFactors.length + matchedProblems.length,
      };
    },
    []
  );

  const results = useMemo(() => search(query), [query, search]);

  return { results, search };
}
