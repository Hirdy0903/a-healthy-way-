import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook for syncing React state with localStorage.
 * Listens for storage events from other tabs.
 */
export default function useLocalStorage(key, defaultValue) {
  const prefixedKey = `mindwell_${key}`;

  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(prefixedKey);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [prefixedKey, value]);

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === prefixedKey) {
        try {
          setValue(e.newValue ? JSON.parse(e.newValue) : defaultValue);
        } catch {
          setValue(defaultValue);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [prefixedKey, defaultValue]);

  const remove = useCallback(() => {
    localStorage.removeItem(prefixedKey);
    setValue(defaultValue);
  }, [prefixedKey, defaultValue]);

  return [value, setValue, remove];
}
