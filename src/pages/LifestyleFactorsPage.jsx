import React from 'react';
import { Link } from 'react-router-dom';
import lifestyleFactors from '@/data/lifestyleFactors';

export default function LifestyleFactorsPage() {
  return (
    <div className="space-y-6 animate-page-enter">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Lifestyle & Biological Factors</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Scientific explanations of how lifestyle choices affect your mental health.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lifestyleFactors.map((factor) => (
          <Link key={factor.id} to={`/lifestyle/${factor.id}`} className="group p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{factor.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{factor.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{factor.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{factor.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
