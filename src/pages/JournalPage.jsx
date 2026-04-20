import React, { useState } from 'react';
import { BookHeart, Plus, Trash2, Tag, Calendar } from 'lucide-react';
import useJournal, { JOURNAL_TEMPLATES } from '@/hooks/useJournal';
import { formatDate, getRelativeTime } from '@/utils/dateUtils';

export default function JournalPage() {
  const { entries, addEntry, deleteEntry } = useJournal();
  const [isWriting, setIsWriting] = useState(false);
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('freeform');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const availableTags = ['stress', 'anxiety', 'sleep', 'exam', 'social', 'gratitude', 'reflection', 'burnout'];

  const handleSave = () => {
    if (!content.trim()) return;
    addEntry({
      content: content.trim(),
      template: selectedTemplate,
      tags,
      mood: null,
    });
    setContent('');
    setTags([]);
    setIsWriting(false);
  };

  const toggleTag = (tag) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="space-y-6 animate-page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Journal</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Reflect, process, and grow through writing.</p>
        </div>
        <button onClick={() => setIsWriting(!isWriting)} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Entry
        </button>
      </div>

      {isWriting && (
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
          {/* Template selection */}
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Choose a template</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(JOURNAL_TEMPLATES).map((t) => (
                <button key={t.id} onClick={() => { setSelectedTemplate(t.id); setContent(''); }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${selectedTemplate === t.id ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Writing area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={JOURNAL_TEMPLATES[selectedTemplate]?.prompt || 'Write your thoughts...'}
            rows={8}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
          />

          {/* Tags */}
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${tags.includes(tag) ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:border-slate-300'}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} disabled={!content.trim()} className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">Save Entry</button>
            <button onClick={() => { setIsWriting(false); setContent(''); }} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-600">Cancel</button>
          </div>
        </div>
      )}

      {/* Entries list */}
      {entries.length > 0 ? (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(entry.createdAt, 'full')}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500">
                    {JOURNAL_TEMPLATES[entry.template]?.name || 'Free Writing'}
                  </span>
                </div>
                <button onClick={() => deleteEntry(entry.id)} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex gap-1 mt-3">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookHeart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400">No journal entries yet.</p>
          <p className="text-xs text-slate-400 mt-1">Start writing to process your thoughts and emotions.</p>
        </div>
      )}
    </div>
  );
}
