import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle, Target, Lightbulb } from 'lucide-react';
import studentProblems from '@/data/studentProblems';

export default function ProblemDetailPage() {
  const { id } = useParams();
  const problem = studentProblems.find((p) => p.id === id);

  if (!problem) {
    return <div className="text-center py-20"><p className="text-slate-500">Problem not found.</p><Link to="/problems" className="text-teal-600 text-sm mt-2 inline-block">← Back</Link></div>;
  }

  return (
    <div className="space-y-8 animate-page-enter max-w-4xl">
      <Link to="/problems" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600"><ArrowLeft className="w-4 h-4" /> Back to Problems</Link>
      <div className="flex items-center gap-3">
        <span className="text-4xl">{problem.icon}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{problem.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{problem.subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{problem.description}</p>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />Warning Signs</h2>
        <ul className="space-y-2">
          {problem.signs.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />{s}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-violet-500" />Root Causes</h2>
        <ul className="space-y-2">
          {problem.rootCauses.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"><span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />{c}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2"><Target className="w-5 h-5 text-teal-500" />Strategies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {problem.strategies.map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-teal-600" /><h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.title}</h4></div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {problem.exercises && problem.exercises.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Practical Exercise</h2>
          {problem.exercises.map((ex, i) => (
            <div key={i} className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">{ex.title}</h4>
              <ol className="space-y-2">
                {ex.steps.map((step, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-blue-700 dark:text-blue-400">
                    <span className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold flex-shrink-0">{j + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
