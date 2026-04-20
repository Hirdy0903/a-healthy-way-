import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, AlertTriangle, Heart, ExternalLink, Shield, BookOpen } from 'lucide-react';
import helplines from '@/data/helplines';

export default function EmergencyPage() {
  return (
    <div className="space-y-6 animate-page-enter max-w-4xl">
      {/* SOS Header */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-8 h-8" />
          <h1 className="text-2xl sm:text-3xl font-bold">Emergency Help & Support</h1>
        </div>
        <p className="text-red-100 text-sm leading-relaxed">If you or someone you know is in immediate danger, please call your local emergency number immediately. You are not alone, and help is available.</p>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400">{helplines.disclaimer}</p>
        </div>
      </div>

      {/* When to seek help */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">When to Seek Professional Help</h2>
        <div className="space-y-2">
          {helplines.whenToSeekHelp.map((item, i) => (
            <div key={i} className={`p-4 rounded-xl border ${
              item.urgency === 'immediate' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
              item.urgency === 'soon' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
              'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.situation}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.action}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                  item.urgency === 'immediate' ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200' :
                  item.urgency === 'soon' ? 'bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200' :
                  'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                }`}>{item.urgency}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Helplines */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2"><Phone className="w-5 h-5 text-teal-500" />Crisis Helplines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {helplines.helplineNumbers.map((h, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{h.name}</h4>
              <p className="text-lg font-bold text-teal-600 dark:text-teal-400 my-1">{h.number}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{h.description}</p>
              <p className="text-[10px] text-slate-400 mt-1">Available: {h.available}</p>
            </div>
          ))}
        </div>
      </section>

      {/* University resources */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">University Resources</h2>
        <div className="space-y-2">
          {helplines.universityResources.map((r, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{r.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Self-help resources */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-500" />Evidence-Based Resources</h2>
        <div className="space-y-2">
          {helplines.selfHelpResources.map((r, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{r.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grounding technique quick access */}
      <section className="p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
        <h3 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">Need Immediate Calm?</h3>
        <p className="text-sm text-teal-700 dark:text-teal-400 mb-3">Try the 5-4-3-2-1 grounding technique or guided breathing exercise.</p>
        <Link to="/toolkit" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors">
          Open Wellness Toolkit →
        </Link>
      </section>
    </div>
  );
}
