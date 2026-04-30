/**
 * Storage Service — Abstraction layer for data persistence
 * 
 * ARCHITECTURE NOTE: All data access goes through this service.
 * Currently uses localStorage. To migrate to MongoDB:
 *   1. Set up Express + Mongoose backend
 *   2. Replace each method here with fetch() calls to your API
 *   3. Zero changes needed in components or hooks
 * 
 * This demonstrates clean separation of concerns — a key
 * architectural principle for scalable applications.
 */

const PREFIX = 'mindwell_';

// Helper to get JWT token from localStorage
const getToken = () => {
  try {
    const user = JSON.parse(window.localStorage.getItem('mindwell_user'));
    return user ? user.token : null;
  } catch (e) {
    return null;
  }
};

// Helper to push log to backend
const syncLogToBackend = async (key, data) => {
  const token = getToken();
  if (!token) return false;

  try {
    // Map local keys to backend types
    let type = 'data';
    if (key.includes('mood_entries')) type = 'mood';
    else if (key.includes('journal_entries')) type = 'journal';
    else if (key.includes('assessment_results')) type = 'assessment';
    else if (key.includes('followup_data')) type = 'followup';
    else type = key; // Fallback

    const response = await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, data }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to sync to backend, falling back to local storage');
    return false;
  }
};

const storageService = {
  // Generic CRUD operations
  get(key) {
    try {
      const data = localStorage.getItem(PREFIX + key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return null;
    }
  },

  set(key, value) {
    try {
      const fullKey = `${PREFIX}${key}`;
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(fullKey, serializedValue);
      
      // Attempt to sync to backend in the background
      syncLogToBackend(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing ${key}:`, error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      return false;
    }
  },

  // --- Mood Data ---
  getMoodEntries() {
    return this.get('mood_entries') || [];
  },

  addMoodEntry(entry) {
    const entries = this.getMoodEntries();
    const newEntry = { ...entry, id: Date.now().toString(), createdAt: new Date().toISOString() };
    entries.push(newEntry);
    this.set('mood_entries', entries);
    return newEntry;
  },

  // --- Journal Entries ---
  getJournalEntries() {
    return this.get('journal_entries') || [];
  },

  addJournalEntry(entry) {
    const entries = this.getJournalEntries();
    const newEntry = { ...entry, id: Date.now().toString(), createdAt: new Date().toISOString() };
    entries.push(newEntry);
    this.set('journal_entries', entries);
    return newEntry;
  },

  deleteJournalEntry(id) {
    const entries = this.getJournalEntries().filter((e) => e.id !== id);
    this.set('journal_entries', entries);
  },

  // --- Assessment Results ---
  getAssessmentResults() {
    return this.get('assessment_results') || [];
  },

  addAssessmentResult(result) {
    const results = this.getAssessmentResults();
    const newResult = { ...result, id: Date.now().toString(), completedAt: new Date().toISOString() };
    results.push(newResult);
    this.set('assessment_results', results);
    return newResult;
  },

  // --- User Preferences ---
  getPreferences() {
    return this.get('preferences') || { name: '', darkMode: false, fontSize: 'medium' };
  },

  setPreferences(prefs) {
    this.set('preferences', prefs);
  },

  // --- Program Progress ---
  getProgramProgress() {
    return this.get('program_progress') || {};
  },

  updateProgramProgress(programId, dayIndex, completed) {
    const progress = this.getProgramProgress();
    if (!progress[programId]) progress[programId] = { startedAt: new Date().toISOString(), days: {} };
    progress[programId].days[dayIndex] = { completed, completedAt: completed ? new Date().toISOString() : null };
    this.set('program_progress', progress);
    return progress;
  },

  // --- Habit Tracking ---
  getHabitData() {
    return this.get('habit_data') || { streaks: {}, sleep: [], routineChecks: [] };
  },

  updateHabitData(data) {
    this.set('habit_data', data);
  },

  // --- Badges ---
  getBadges() {
    return this.get('badges') || [];
  },

  addBadge(badge) {
    const badges = this.getBadges();
    if (!badges.find((b) => b.id === badge.id)) {
      badges.push({ ...badge, earnedAt: new Date().toISOString() });
      this.set('badges', badges);
    }
    return badges;
  },

  // --- Trigger Logs ---
  getTriggerLogs() {
    return this.get('trigger_logs') || [];
  },

  addTriggerLog(log) {
    const logs = this.getTriggerLogs();
    logs.push({ ...log, id: Date.now().toString(), createdAt: new Date().toISOString() });
    this.set('trigger_logs', logs);
  },

  // --- Check-in Data ---
  getLastCheckIn() {
    return this.get('last_checkin');
  },

  saveCheckIn(data) {
    this.set('last_checkin', { ...data, timestamp: new Date().toISOString() });
  },

  // --- Full Reset ---
  resetAllData() {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
  },
};

export default storageService;
