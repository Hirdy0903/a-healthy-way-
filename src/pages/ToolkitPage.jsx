import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Timer, Wind, BookHeart, Heart, Play, Pause, RotateCcw, Square, Hand, Eye, Ear, Droplets, Cookie } from 'lucide-react';

// ---- Pomodoro Timer ----
function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // focus | break
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              if (mode === 'focus') {
                setSessions((s) => s + 1);
                setMode('break');
                setMinutes(5);
              } else {
                setMode('focus');
                setMinutes(25);
              }
              setSeconds(0);
              return 0;
            }
            setMinutes((m) => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, minutes, mode]);

  const reset = () => { setIsRunning(false); setMinutes(mode === 'focus' ? 25 : 5); setSeconds(0); };

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="w-5 h-5 text-teal-600" />
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Pomodoro Focus Timer</h3>
      </div>
      <div className="text-center mb-6">
        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${mode === 'focus' ? 'text-teal-600' : 'text-green-600'}`}>
          {mode === 'focus' ? '🎯 Focus Time' : '☕ Break Time'}
        </p>
        <p className="text-6xl font-bold text-slate-800 dark:text-slate-100 font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <p className="text-xs text-slate-400 mt-2">Sessions completed: {sessions}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setIsRunning(!isRunning)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${isRunning ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
          {isRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
        </button>
        <button onClick={reset} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-600">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ---- Breathing Exercise ----
function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('ready'); // ready | inhale | hold | exhale
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef(null);
  const phaseRef = useRef('ready');

  const phases = [
    { name: 'inhale', duration: 4, label: 'Breathe In', color: 'text-blue-500' },
    { name: 'hold', duration: 7, label: 'Hold', color: 'text-amber-500' },
    { name: 'exhale', duration: 8, label: 'Breathe Out', color: 'text-teal-500' },
  ];

  useEffect(() => {
    if (!isActive) return;
    let phaseIndex = 0;
    let count = phases[0].duration;
    setPhase(phases[0].name);
    setCounter(count);

    intervalRef.current = setInterval(() => {
      count--;
      if (count <= 0) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        count = phases[phaseIndex].duration;
        setPhase(phases[phaseIndex].name);
      }
      setCounter(count);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const stop = () => { setIsActive(false); setPhase('ready'); setCounter(0); clearInterval(intervalRef.current); };
  const currentPhaseData = phases.find((p) => p.name === phase);

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">4-7-8 Breathing</h3>
      </div>
      <div className="flex flex-col items-center py-6">
        <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-1000 ${
          phase === 'inhale' ? 'scale-125 border-blue-400 bg-blue-50 dark:bg-blue-900/20' :
          phase === 'hold' ? 'scale-125 border-amber-400 bg-amber-50 dark:bg-amber-900/20' :
          phase === 'exhale' ? 'scale-75 border-teal-400 bg-teal-50 dark:bg-teal-900/20' :
          'scale-100 border-slate-200 dark:border-slate-600'
        }`}>
          {isActive ? (
            <div className="text-center">
              <p className={`text-3xl font-bold ${currentPhaseData?.color || 'text-slate-400'}`}>{counter}</p>
              <p className={`text-xs font-medium ${currentPhaseData?.color || 'text-slate-400'}`}>{currentPhaseData?.label}</p>
            </div>
          ) : (
            <Wind className="w-10 h-10 text-slate-300" />
          )}
        </div>
        <p className="text-xs text-slate-500 mb-4">Inhale 4s → Hold 7s → Exhale 8s</p>
      </div>
      <button
        onClick={() => isActive ? stop() : setIsActive(true)}
        className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${
          isActive ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isActive ? <><Square className="w-4 h-4" /> Stop</> : <><Play className="w-4 h-4" /> Start Exercise</>}
      </button>
    </div>
  );
}

// ---- 5-4-3-2-1 Grounding ----
function GroundingExercise() {
  const [step, setStep] = useState(0);
  const steps = [
    { count: 5, sense: 'SEE', icon: Eye, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20', prompt: 'Name 5 things you can SEE right now' },
    { count: 4, sense: 'TOUCH', icon: Hand, color: 'text-green-500 bg-green-50 dark:bg-green-900/20', prompt: 'Name 4 things you can TOUCH right now' },
    { count: 3, sense: 'HEAR', icon: Ear, color: 'text-violet-500 bg-violet-50 dark:bg-violet-900/20', prompt: 'Name 3 things you can HEAR right now' },
    { count: 2, sense: 'SMELL', icon: Droplets, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20', prompt: 'Name 2 things you can SMELL right now' },
    { count: 1, sense: 'TASTE', icon: Cookie, color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20', prompt: 'Name 1 thing you can TASTE right now' },
  ];

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <Hand className="w-5 h-5 text-green-500" />
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">5-4-3-2-1 Grounding</h3>
      </div>
      {step < 5 ? (
        <div className="text-center py-4">
          <div className={`w-20 h-20 rounded-2xl ${steps[step].color} flex items-center justify-center mx-auto mb-4`}>
            {React.createElement(steps[step].icon, { className: 'w-8 h-8' })}
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">{steps[step].count}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{steps[step].prompt}</p>
          <div className="flex gap-2 justify-center mb-4">
            {steps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i <= step ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-600'}`} />
            ))}
          </div>
          <button onClick={() => setStep((s) => s + 1)} className="px-6 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700">
            {step < 4 ? 'Next →' : 'Complete'}
          </button>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-3xl mb-2">✅</p>
          <p className="font-semibold text-slate-800 dark:text-slate-100">You did it!</p>
          <p className="text-sm text-slate-500 mt-1">You should feel more grounded now.</p>
          <button onClick={() => setStep(0)} className="mt-4 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300">
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

// ---- Main Toolkit Page ----
export default function ToolkitPage() {
  return (
    <div className="space-y-6 animate-page-enter">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Wellness Toolkit</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Evidence-based tools for immediate relief and daily wellness.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PomodoroTimer />
        <BreathingExercise />
        <GroundingExercise />
        
        {/* Quick links */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">More Tools</h3>
          <div className="space-y-3">
            <Link to="/journal" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center"><BookHeart className="w-5 h-5 text-blue-500" /></div>
              <div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Guided Journaling</p><p className="text-xs text-slate-400">CBT, gratitude, and reflection templates</p></div>
            </Link>
            <Link to="/mood" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center"><Heart className="w-5 h-5 text-rose-500" /></div>
              <div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Mood Tracker</p><p className="text-xs text-slate-400">Track emotions and discover patterns</p></div>
            </Link>
            <Link to="/programs" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center"><Timer className="w-5 h-5 text-violet-500" /></div>
              <div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Guided Programs</p><p className="text-xs text-slate-400">7-Day Anxiety Reset, Sleep Improvement & more</p></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
