import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import lifestyleFactors from '@/data/lifestyleFactors';

export default function FactorDetailPage() {
  const { id } = useParams();
  const factor = lifestyleFactors.find((f) => f.id === id);

  if (!factor) {
    return (
      <div className="text-center py-20"><p className="text-slate-500">Factor not found.</p>
        <Link to="/lifestyle" className="text-teal-600 text-sm mt-2 inline-block">← Back</Link></div>
    );
  }

  return (
    <div className="space-y-8 animate-page-enter max-w-4xl">
      <Link to="/lifestyle" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600"><ArrowLeft className="w-4 h-4" /> Back</Link>
      <div className="flex items-center gap-3">
        <span className="text-4xl">{factor.icon}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{factor.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{factor.subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{factor.overview}</p>

      {factor.scienceExplanation.map((s, i) => (
        <section key={i}>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{s.heading}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.content}</p>
        </section>
      ))}

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Impact on Students</h2>
        <ul className="space-y-2">
          {factor.studentImpact.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />{item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Recommendations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {factor.recommendations.map((r, i) => (
            <div key={i} className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-teal-600" /><h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{r.title}</h4></div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{r.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
