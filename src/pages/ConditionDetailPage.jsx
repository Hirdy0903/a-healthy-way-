import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import conditions from '@/data/conditions';

export default function ConditionDetailPage() {
  const { id } = useParams();
  const condition = conditions.find((c) => c.id === id);

  if (!condition) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Condition not found.</p>
        <Link to="/conditions" className="text-teal-600 text-sm mt-2 inline-block">← Back to Knowledge Base</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-page-enter max-w-4xl">
      <Link to="/conditions" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Knowledge Base
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{condition.icon}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{condition.title}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{condition.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Definition */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">What is {condition.title}?</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{condition.definition}</p>
        {condition.prevalence && (
          <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300"><strong>Prevalence:</strong> {condition.prevalence}</p>
          </div>
        )}
      </section>

      {/* Symptoms */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Symptoms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {condition.symptoms.map((s, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                s.category === 'physical' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                s.category === 'emotional' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' :
                s.category === 'cognitive' ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' :
                'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
              }`}>
                {s.category}
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex-1">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Causes */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Causes</h2>
        <ul className="space-y-2">
          {condition.causes.map((cause, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
              {cause}
            </li>
          ))}
        </ul>
      </section>

      {/* Risk Factors */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Risk Factors</h2>
        <div className="flex flex-wrap gap-2">
          {condition.riskFactors.map((rf, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {rf}
            </span>
          ))}
        </div>
      </section>

      {/* Lifestyle Impact */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Impact on Student Life</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{condition.lifestyleImpact}</p>
      </section>

      {/* Coping Mechanisms */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Coping Strategies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {condition.copingMechanisms.map((cm, i) => (
            <div key={i} className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{cm.title}</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{cm.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* When to Seek Help */}
      <section className="p-5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">When to Seek Professional Help</h2>
        </div>
        <ul className="space-y-2">
          {condition.whenToSeekHelp.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Link to="/emergency" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-red-700 dark:text-red-300 hover:text-red-800">
          View emergency resources →
        </Link>
      </section>
    </div>
  );
}
