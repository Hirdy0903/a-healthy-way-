import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Heart, TrendingUp, BookOpen, Sparkles, AlertTriangle, ArrowRight, Calendar, Brain, ClipboardList, Lightbulb, ShieldCheck, MessageCircle, Flame, Wind } from 'lucide-react';
import useMoodData from '@/hooks/useMoodData';
import useJournal from '@/hooks/useJournal';
import useAssessmentResults from '@/hooks/useAssessmentResults';
import useMentalStateEngine from '@/hooks/useMentalStateEngine';
import { useAuth } from '@/hooks/useAuth';
import dailyTips from '@/data/dailyTips';
import { formatDate, getRelativeTime } from '@/utils/dateUtils';
import InterventionMode from '@/components/InterventionMode/InterventionMode';

export default function DashboardPage() {
  const { entries: moodEntries, trends, patterns, getRecentEntries } = useMoodData();
  const { getRecentEntries: getRecentJournals } = useJournal();
  const { getLatestResult, crisisIndicators } = useAssessmentResults();
  const mentalState = useMentalStateEngine();
  const { user } = useAuth();
  const [interventionOpen, setInterventionOpen] = useState(false);
  const [interventionFlow, setInterventionFlow] = useState(null);

  const [loadingWidgets, setLoadingWidgets] = useState(true);

  // Simulate soft loading state for skeletons
  useEffect(() => {
    const timer = setTimeout(() => setLoadingWidgets(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Get daily tip based on date
  const todayTip = dailyTips[new Date().getDate() % dailyTips.length];
  const recentMoods = getRecentEntries(7);
  const recentJournals = getRecentJournals(3);
  const latestMentalHealth = getLatestResult('mental-health-screening');
  const latestStress = getLatestResult('stress-level-analyzer');
  const latestSleep = getLatestResult('sleep-quality-analyzer');

  // Mood emojis for display
  const getMoodEmoji = (mood) => {
    if (mood >= 8) return '😊';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '😟';
    return '😢';
  };

  return (
    <div className="space-y-6 animate-page-enter">
      {/* Intervention Mode overlay */}
      {interventionOpen && (
        <InterventionMode 
          onClose={() => { setInterventionOpen(false); setInterventionFlow(null); }} 
          initialFlow={interventionFlow} 
        />
      )}

      {/* ── TOP ACTION BANNERS ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={() => { setInterventionFlow('burnFlow'); setInterventionOpen(true); }}
          className="relative overflow-hidden rounded-2xl p-5 text-left transition-all hover:scale-[1.02] active:scale-95"
          style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #334155', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/20">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Burn a Thought</h3>
              <p className="text-slate-400 text-sm">Write it down and watch it burn away</p>
            </div>
          </div>
        </button>
        
        <button 
          onClick={() => { setInterventionFlow('bubbleFlow'); setInterventionOpen(true); }}
          className="relative overflow-hidden rounded-2xl p-5 text-left transition-all hover:scale-[1.02] active:scale-95"
          style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', border: '1px solid #7dd3fc', boxShadow: '0 4px 12px rgba(14,165,233,0.1)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-sky-500/20">
              <Wind className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h3 className="text-sky-900 font-bold text-lg">Pop Stress Bubbles</h3>
              <p className="text-sky-700 text-sm">Tap away your anxiety and tension</p>
            </div>
          </div>
        </button>
      </div>

      {/* ── PROMINENT SUPPORT HERO CARD ─────────────────── */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #0EA5E9 100%)', boxShadow: '0 8px 32px rgba(15,118,110,0.30)' }}>
        {/* Decorative blobs */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-20 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-1">Need to talk?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              How are you feeling right now?
            </h2>
            <p className="text-indigo-200 text-sm mt-2 max-w-sm">
              Pick what's on your mind and I'll guide you through it — one step at a time. Private & judgment-free.
            </p>
          </div>
          <button
            onClick={() => setInterventionOpen(true)}
            className="flex-shrink-0 flex items-center gap-3 px-6 py-4 font-semibold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95"
            style={{ background: '#0F766E', color: '#fff', boxShadow: '0 4px 16px rgba(15,118,110,0.35)' }}
          >
            <MessageCircle className="w-5 h-5" />
            Get Support Now
          </button>
        </div>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {[
            { label: 'Anxiety', emoji: '😰' },
            { label: 'Low Mood', emoji: '🌧️' },
            { label: 'Overwhelmed', emoji: '📚' },
            { label: 'Relationships', emoji: '❤️' },
            { label: 'Career', emoji: '💼' },
          ].map((chip) => (
            <button
              key={chip.label}
              onClick={() => setInterventionOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <span>{chip.emoji}</span> {chip.label}
            </button>
          ))}
        </div>
      </div>
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl" style={{ background: 'var(--color-card)', boxShadow: '0 2px 12px rgba(15,118,110,0.08)', border: '1px solid var(--color-border)' }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#2D2A32' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Friend'} 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: '#7E7A8A' }}>Here's how you've been doing lately.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full" style={{ background: 'rgba(15,118,110,0.08)', border: '1px solid rgba(15,118,110,0.20)' }}>
          <ShieldCheck className="w-4 h-4" style={{ color: '#0F766E' }} />
          <span className="text-xs font-medium" style={{ color: '#7E7A8A' }}>This space is private and judgment-free. It's okay to ask for help.</span>
        </div>
      </div>

      {/* Crisis alert */}
      {crisisIndicators.length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-300">We're Here for You</h3>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                Your recent assessments indicate some areas of concern. Remember, seeking help is a sign of strength.
              </p>
              <Link to="/emergency" className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-red-700 dark:text-red-300 hover:text-red-800">
                View support resources <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Daily tip */}
      <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(15,118,110,0.07), rgba(14,165,233,0.07))', border: '1px solid rgba(15,118,110,0.15)' }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0F766E, #0EA5E9)' }}>
            <Lightbulb className="w-5 h-5" style={{ color: '#fff' }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#0F766E' }}>Daily Tip</p>
            <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{todayTip.text}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-placeholder)' }}>Source: {todayTip.source}</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Mood Entries</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{moodEntries.length}</p>
          <p className="text-xs text-slate-400 mt-1">
            {moodEntries.length > 0 ? `Last: ${getRelativeTime(moodEntries[moodEntries.length - 1]?.createdAt)}` : 'Start tracking'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Avg Mood</span>
            <TrendingUp className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {trends ? `${trends.averageMood.toFixed(1)}` : '—'} <span className="text-sm font-normal text-slate-400">/10</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {trends && trends.moodTrend > 0 ? '↑ Improving' : trends && trends.moodTrend < 0 ? '↓ Declining' : '14-day average'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Stress Level</span>
            <Brain className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {latestStress ? latestStress.label : '—'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {latestStress ? `Taken ${getRelativeTime(latestStress.completedAt)}` : 'Take assessment'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Assessments</span>
            <ClipboardList className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {[latestMentalHealth, latestStress, latestSleep].filter(Boolean).length}
            <span className="text-sm font-normal text-slate-400">/3</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Completed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood chart */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">Mood Trends</h3>
              <p className="text-xs text-slate-400">Last 7 entries</p>
            </div>
            <Link to="/mood" className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentMoods.length > 1 ? (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={recentMoods}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F766E" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9E6F2" />
                <XAxis dataKey="createdAt" tickFormatter={(v) => formatDate(v)} tick={{ fontSize: 11, fill: '#7E7A8A' }} stroke="#E9E6F2" />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#7E7A8A' }} stroke="#E9E6F2" />
                <Tooltip labelFormatter={(v) => formatDate(v, 'medium')} contentStyle={{ borderRadius: 12, border: '1px solid #E9E6F2', boxShadow: '0 4px 16px rgba(15,118,110,0.12)' }} />
                <Area type="monotone" dataKey="mood" stroke="#0F766E" fill="url(#moodGradient)" strokeWidth={2.5} dot={{ r: 3, fill: '#0F766E', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>

          ) : (
            <div className="h-[180px] flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
              <Heart className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">Start tracking your mood to see trends</p>
              <Link to="/mood" className="mt-2 text-xs text-teal-600 font-medium hover:text-teal-700">Log your first mood →</Link>
            </div>
          )}
        </div>

        {/* Recent journal entries */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">Recent Journal</h3>
              <p className="text-xs text-slate-400">Your latest reflections</p>
            </div>
            <Link to="/journal" className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 font-medium flex items-center gap-1">
              Write entry <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentJournals.length > 0 ? (
            <div className="space-y-3">
              {recentJournals.map((entry) => (
                <div key={entry.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {formatDate(entry.createdAt, 'medium')}
                    </span>
                    {entry.tags && entry.tags.length > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
                        {entry.tags[0]}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">{entry.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[180px] flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
              <BookOpen className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No journal entries yet</p>
              <Link to="/journal" className="mt-2 text-xs text-teal-600 font-medium hover:text-teal-700">Start journaling →</Link>
            </div>
          )}
        </div>
      </div>

      {/* Adaptive Daily Plan */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-teal-500" />
            Your Plan for Today
          </h3>
          {mentalState.isRecoveryMode && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center gap-1">
              <Heart className="w-3 h-3" /> Recovery Mode Active
            </span>
          )}
        </div>

        {loadingWidgets ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-xl animate-shimmer" />
            ))}
          </div>
        ) : (
          <>
            {/* Insight Layer */}
            {mentalState.reasons.length > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-start gap-3">
                <Brain className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0 hidden sm:block" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5 text-violet-500 sm:hidden" /> Why you're seeing this plan:
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {mentalState.reasons.slice(0, 2).map((reason, i) => (
                      <li key={i} className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-violet-400" /> {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Soft Social Proof */}
                <div className="sm:text-right mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">Thousands of students feel this way.</p>
                  <p className="text-[10px] font-medium text-teal-600 dark:text-teal-400">You're not alone.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mentalState.dailyPlan.map((action, i) => (
                <div key={i} className={`p-4 rounded-xl border-2 transition-all card-hover ${
                  action.type === 'regulation' ? 'bg-teal-50 dark:bg-teal-900/10 border-teal-100 dark:border-teal-800' :
                  action.type === 'productivity' ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800' :
                  'bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{action.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        action.type === 'regulation' ? 'text-teal-600 dark:text-teal-400' :
                        action.type === 'productivity' ? 'text-blue-600 dark:text-blue-400' :
                        'text-violet-600 dark:text-violet-400'
                      }`}>{action.type}</span>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{action.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{action.description}</p>
                      {action.link && (
                        <Link to={action.link} className={`inline-flex items-center gap-1 mt-2 text-xs font-medium ${
                          action.type === 'regulation' ? 'text-teal-600 hover:text-teal-700 dark:text-teal-400' :
                          action.type === 'productivity' ? 'text-blue-600 hover:text-blue-700 dark:text-blue-400' :
                          'text-violet-600 hover:text-violet-700 dark:text-violet-400'
                        }`}>
                          Start <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Patterns/Warnings */}
      {patterns.length > 0 && (
        <div className="space-y-3">
          {patterns.map((p, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border ${
                p.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
                p.type === 'alert' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              }`}
            >
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{p.message}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.suggestion}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/mood',        icon: Heart,         label: 'Log Mood',        bg: 'rgba(15,118,110,0.12)', iconColor: '#0F766E' },
            { to: '/journal',     icon: BookOpen,      label: 'Write Journal',   bg: 'rgba(14,165,233,0.15)', iconColor: '#38BDF8' },
            { to: '/assessments', icon: ClipboardList, label: 'Assessment',      bg: 'rgba(20,184,166,0.12)', iconColor: '#14B8A6' },
            { to: '/toolkit',     icon: Sparkles,      label: 'Wellness',        bg: 'rgba(110,231,183,0.15)', iconColor: '#10B981' },
          ].map((action, idx) => (
            action.to ? (
              <Link
                key={action.to}
                to={action.to}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl card-hover text-center"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(15,118,110,0.08)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: action.bg }}>
                  <action.icon className="w-5 h-5" style={{ color: action.iconColor }} />
                </div>
                <span className="text-[11px] sm:text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{action.label}</span>
              </Link>
            ) : (
              <button
                key={idx}
                onClick={action.onClick}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl card-hover text-center"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(15,118,110,0.08)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: action.bg }}>
                  <action.icon className="w-5 h-5" style={{ color: action.iconColor }} />
                </div>
                <span className="text-[11px] sm:text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{action.label}</span>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> MindWell is an educational tool designed to support student wellbeing. It is NOT a substitute for professional mental health diagnosis or treatment. If you are experiencing a mental health crisis, please contact a professional or use the emergency resources provided. All data is stored locally on your device.
        </p>
      </div>
    </div>
  );
}
