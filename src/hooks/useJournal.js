import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Hook for managing journal entries with templates and tagging.
 * Supports gratitude, thought dump, and CBT-style journaling.
 */
export const JOURNAL_TEMPLATES = {
  freeform: { id: 'freeform', name: 'Free Writing', prompt: 'Write freely about anything on your mind...' },
  gratitude: { id: 'gratitude', name: 'Gratitude Journal', prompt: 'List 3 things you are grateful for today and why...' },
  thoughtDump: { id: 'thoughtDump', name: 'Thought Dump', prompt: 'Write everything on your mind without filtering. Get it out of your head and onto the page...' },
  cbt: {
    id: 'cbt',
    name: 'CBT Reflection',
    prompt: 'Situation: What happened?\nThought: What went through your mind?\nEmotion: What did you feel? (Rate intensity 1-10)\nAlternative Thought: What is a more balanced way to see this?',
  },
  reflection: { id: 'reflection', name: 'Daily Reflection', prompt: 'What went well today? What was challenging? What did I learn?' },
};

export default function useJournal() {
  const [entries, setEntries] = useLocalStorage('journal_entries', []);

  const addEntry = useCallback(
    (entry) => {
      const newEntry = {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        date: entry.date || new Date().toISOString().split('T')[0],
      };
      setEntries((prev) => [newEntry, ...prev]);
      return newEntry;
    },
    [setEntries]
  );

  const deleteEntry = useCallback(
    (id) => {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    },
    [setEntries]
  );

  const getEntriesByTag = useCallback(
    (tag) => {
      return entries.filter((e) => e.tags && e.tags.includes(tag));
    },
    [entries]
  );

  const getRecentEntries = useCallback(
    (count = 5) => {
      return entries.slice(0, count);
    },
    [entries]
  );

  const getEntriesByDate = useCallback(
    (date) => {
      return entries.filter((e) => e.date === date);
    },
    [entries]
  );

  return {
    entries,
    addEntry,
    deleteEntry,
    getEntriesByTag,
    getRecentEntries,
    getEntriesByDate,
    totalEntries: entries.length,
  };
}
