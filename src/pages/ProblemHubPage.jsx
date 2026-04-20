import React from 'react';
import { Link } from 'react-router-dom';
import studentProblems from '@/data/studentProblems';

export default function ProblemHubPage() {
  return (
    <div className="space-y-6 animate-page-enter">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Student Problem Hub</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Common challenges students face — with actionable strategies to overcome them.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {studentProblems.map((p) => (
          <Link key={p.id} to={`/problems/${p.id}`} className="group p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{p.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{p.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{p.description}</p>
            <div className="mt-3 flex gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500">{p.strategies.length} strategies</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500">{p.signs.length} signs</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
