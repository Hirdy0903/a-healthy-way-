import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import conditions from '@/data/conditions';

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = conditions.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-page-enter">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Mental Health Knowledge Base</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Research-backed information on common mental health conditions affecting students.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((condition) => (
          <Link
            key={condition.id}
            to={`/conditions/${condition.id}`}
            className="group p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{condition.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {condition.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{condition.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{condition.definition}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                {condition.symptoms.length} symptoms
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                {condition.copingMechanisms.length} coping strategies
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="text-sm">No conditions match your search.</p>
        </div>
      )}
    </div>
  );
}
