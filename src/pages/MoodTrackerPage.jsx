import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Heart, Save, TrendingUp, AlertTriangle } from 'lucide-react';
import useMoodData from '@/hooks/useMoodData';
import { formatDate } from '@/utils/dateUtils';

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Very Sad' },
  { value: 2, emoji: '😟', label: 'Sad' },
  { value: 3, emoji: '😕', label: 'Down' },
  { value: 4, emoji: '😐', label: 'Neutral-' },
  { value: 5, emoji: '🙂', label: 'Okay' },
  { value: 6, emoji: '😊', label: 'Good' },
  { value: 7, emoji: '😄', label: 'Happy' },
  { value: 8, emoji: '😁', label: 'Very Happy' },
  { value: 9, emoji: '🤩', label: 'Excellent' },
  { value: 10, emoji: '🥳', label: 'Ecstatic' },
];

export default function MoodTrackerPage() {
  const { entries, addMoodEntry, trends, patterns, getRecentEntries } = useMoodData();
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(3);
  const [energy, setEnergy] = useState(5);
  const [anxiety, setAnxiety] = useState(3);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    addMoodEntry({ mood, stress, energy, anxiety, notes: notes.trim() });
    setNotes('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const recentEntries = getRecentEntries(14);

  return (
    <div className="space-y-6 animate-page-enter">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Mood Tracker</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track your emotional state and discover patterns over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Log mood */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-5">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">How are you feeling?</h3>
          </div>

          {/* Emoji picker */}
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Overall Mood</label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {moodEmojis.map((m) => (
                <button key={m.value} onClick={() => setMood(m.value)}
                  className={`emoji-btn flex flex-col items-center p-2 rounded-xl border-2 transition-all ${mood === m.value ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 selected' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}>
                  <span className="text-xl">{m.emoji}</span>
                  <span className="text-[9px] text-slate-500 mt-0.5">{m.value}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-2">{moodEmojis.find((m) => m.value === mood)?.label}</p>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Stress', value: stress, set: setStress, color: 'text-amber-600' },
              { label: 'Energy', value: energy, set: setEnergy, color: 'text-green-600' },
              { label: 'Anxiety', value: anxiety, set: setAnxiety, color: 'text-red-600' },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</label>
                  <span className={`text-xs font-bold ${s.color}`}>{s.value}/10</span>
                </div>
                <input type="range" min="1" max="10" value={s.value} onChange={(e) => s.set(parseInt(e.target.value))} className="w-full" />
              </div>
            ))}
          </div>

          {/* Notes */}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any notes about how you're feeling? (optional)"
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
          />

          <button onClick={handleSave} className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
            {saved ? <><span>✓</span> Saved!</> : <><Save className="w-4 h-4" /> Save Mood Entry</>}
          </button>
        </div>

        {/* Stats sidebar */}
        <div className="space-y-4">
          {trends && (
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-teal-500" />14-Day Averages</h4>
              {[
                { label: 'Mood', value: trends.averageMood, trend: trends.moodTrend, color: 'text-blue-600' },
                { label: 'Stress', value: trends.averageStress, trend: trends.stressTrend, color: 'text-amber-600' },
                { label: 'Energy', value: trends.averageEnergy, trend: trends.energyTrend, color: 'text-green-600' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                  <span className="text-xs text-slate-500">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${s.color}`}>{s.value.toFixed(1)}</span>
                    <span className={`text-[10px] ${s.trend > 0 ? 'text-green-500' : s.trend < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                      {s.trend > 0 ? '↑' : s.trend < 0 ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {patterns.length > 0 && (
            <div className="space-y-2">
              {patterns.map((p, i) => (
                <div key={i} className={`p-3 rounded-lg border text-xs ${
                  p.type === 'positive' ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' :
                  p.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300' :
                  'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
                }`}>
                  <p className="font-medium">{p.message}</p>
                  <p className="mt-0.5 opacity-80">{p.suggestion}</p>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500">Total entries: <strong>{entries.length}</strong></p>
          </div>
        </div>
      </div>

      {/* Chart */}
      {recentEntries.length > 1 && (
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Mood History</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={recentEntries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="createdAt" tickFormatter={(v) => formatDate(v)} tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip labelFormatter={(v) => formatDate(v, 'medium')} />
              <Line type="monotone" dataKey="mood" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} name="Mood" />
              <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={1.5} dot={{ r: 2 }} name="Energy" />
              <Line type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={1.5} dot={{ r: 2 }} name="Stress" />
              <Line type="monotone" dataKey="anxiety" stroke="#ef4444" strokeWidth={1.5} dot={{ r: 2 }} name="Anxiety" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
