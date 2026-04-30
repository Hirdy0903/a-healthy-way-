import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle, Clock } from 'lucide-react';

// ─────────────────────────────────────────────
// STEP 1: HARD-CODED FLOW CONFIG
// Each flow is an ordered array of step objects.
// ─────────────────────────────────────────────
const FLOWS = {
  anxietyFlow: [
    { type: 'text',      content: "Let's slow things down together. You're safe right now." },
    { type: 'breathing', content: 'Follow the circle — breathe in for 4 seconds, hold 4, out 4, hold 4.' },
    { type: 'grounding', content: 'Look around you. Find 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 good thing about yourself.' },
    { type: 'text',      content: 'You did great. This feeling is temporary. Your nervous system is starting to settle.' },
    { type: 'feedback' },
  ],
  lowMoodFlow: [
    { type: 'text',    content: 'It is completely okay to feel this way. Your feelings are valid and I hear you.' },
    { type: 'text',    content: 'Try one small thing right now: take a sip of water, or stand up and stretch for 10 seconds.' },
    { type: 'journal', content: "Would you like to write down what's bothering you? Sometimes just getting it out helps.", placeholder: "I'm feeling down because..." },
    { type: 'text',    content: "Thank you for sharing that. I'm proud of you for showing up for yourself today." },
    { type: 'feedback' },
  ],
  overwhelmedFlow: [
    { type: 'journal', content: 'What is the absolute biggest thing on your mind right now?', placeholder: 'Right now I am stressed about...' },
    { type: 'text',    content: "OK. Let's put everything else on pause. Your only job right now is to find the one smallest possible next step." },
    { type: 'timer',   content: "Let's focus on that single tiny step for just 5 minutes.", duration: 300 },
    { type: 'text',    content: "Great job. You took the first step — that's usually the hardest part." },
    { type: 'feedback' },
  ],
  focusFlow: [
    { type: 'text',  content: "Quick distraction reset. Close your eyes, take one deep breath, and let go of whatever you were just looking at." },
    { type: 'timer', content: '10 minutes of pure focus. No tabs, no phone. Just one task.', duration: 600 },
    { type: 'text',  content: "Time's up! See? You can absolutely do this. Keep the momentum going." },
    { type: 'feedback' },
  ],
};

// ─────────────────────────────────────────────
// STEP 2: HARD TOPIC → FLOW MAP (NO GUESSING)
// ─────────────────────────────────────────────
const TOPIC_TO_FLOW = {
  anxiety:       'anxietyFlow',
  low_mood:      'lowMoodFlow',
  relationships: 'anxietyFlow',
  career:        'overwhelmedFlow',
  academic:      'overwhelmedFlow',
  self:          'overwhelmedFlow',
  identity:      'lowMoodFlow',
};

const TOPICS = [
  { id: 'anxiety',       label: 'Anxiety / Stress',             emoji: '😰' },
  { id: 'low_mood',      label: 'Low Mood',                     emoji: '🌧️' },
  { id: 'relationships', label: 'Relationships',                emoji: '❤️' },
  { id: 'career',        label: 'Career / Work',                emoji: '💼' },
  { id: 'academic',      label: 'Academic Pressure',            emoji: '📚' },
  { id: 'self',          label: 'Self Improvement',             emoji: '🌱' },
  { id: 'identity',      label: 'Identity & Personal Concerns', emoji: '👤' },
];

// ─────────────────────────────────────────────
// STEP RENDERERS
// ─────────────────────────────────────────────

function TextStep({ step, onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-4 animate-fade-in-up">
      <p className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-snug mb-12 max-w-md">
        {step.content}
      </p>
      <button
        onClick={onNext}
        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium transition-all shadow-md flex items-center gap-2"
      >
        Continue <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function BreathingStep({ step, onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-4 animate-fade-in-up">
      <p className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-10 max-w-sm">{step.content}</p>
      <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900/50" />
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" style={{ animationDuration: '8s' }} />
        <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg animate-pulse" style={{ animationDuration: '4s' }} />
      </div>
      <button
        onClick={onNext}
        className="px-8 py-4 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 rounded-full text-lg font-medium transition-all"
      >
        I'm ready to continue
      </button>
    </div>
  );
}

function GroundingStep({ step, onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-4 animate-fade-in-up">
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">5-4-3-2-1 Grounding</p>
      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-12 max-w-sm">{step.content}</p>
      <button
        onClick={onNext}
        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium transition-all shadow-md flex items-center gap-2"
      >
        Done <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function JournalStep({ step, onNext, onSave }) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) onSave(value.trim());
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 animate-fade-in-up w-full max-w-lg mx-auto">
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-8">{step.content}</p>
      <textarea
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={step.placeholder || 'Type here...'}
        className="w-full h-40 p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none resize-none text-slate-800 dark:text-slate-100 mb-6"
      />
      <button
        onClick={handleSubmit}
        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium transition-all flex items-center gap-2"
      >
        {value.trim() ? 'Save & Continue' : 'Skip'} <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function TimerStep({ step, onNext }) {
  const [timeLeft, setTimeLeft] = useState(step.duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) setIsActive(false);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((step.duration - timeLeft) / step.duration) * 100;
  const circumference = 2 * Math.PI * 48;

  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-4 animate-fade-in-up">
      <p className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-10 max-w-sm">{step.content}</p>
      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle className="text-slate-200 dark:text-slate-700 stroke-current" strokeWidth="4" cx="50" cy="50" r="48" fill="transparent" />
          <circle
            className="text-indigo-500 stroke-current transition-all duration-1000 ease-linear"
            strokeWidth="4" cx="50" cy="50" r="48" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-5xl font-mono font-bold text-slate-800 dark:text-slate-100 tracking-tighter">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {timeLeft === 0 ? (
        <button onClick={onNext} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-lg font-medium transition-all flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Done!
        </button>
      ) : !isActive ? (
        <button onClick={() => setIsActive(true)} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium transition-all shadow-md flex items-center gap-2">
          <Clock className="w-5 h-5" /> {timeLeft < step.duration ? 'Resume' : 'Start Timer'}
        </button>
      ) : (
        <button onClick={() => setIsActive(false)} className="px-8 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-medium transition-all">
          Pause
        </button>
      )}
    </div>
  );
}

function FeedbackStep({ onComplete }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-4 animate-fade-in-up">
      <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-10">Did this help?</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {['Yes, a lot 😊', 'A little bit 🙂', 'Not really 😔'].map((opt) => (
          <button
            key={opt}
            onClick={() => onComplete(opt)}
            className="px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200 rounded-2xl text-lg font-medium transition-all"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function InterventionMode({ onClose }) {
  // STEP 1: Global state control
  const [mode, setMode] = useState('selection'); // 'selection' | 'transitioning' | 'intervention' | 'complete'
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [currentFlow, setCurrentFlow] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // STEP 3: Click handler — HARD MAP, no guessing
  const handleTopicSelect = (topic) => {
    const flowId = TOPIC_TO_FLOW[topic.id];

    // STEP 7: Fail-safe
    const resolvedFlow = FLOWS[flowId] || FLOWS.anxietyFlow;

    // STEP 8: Debug logs
    console.log('[InterventionMode] selectedProblem:', topic.id);
    console.log('[InterventionMode] mappedFlowId:', flowId);
    console.log('[InterventionMode] resolvedFlow steps:', resolvedFlow.length);

    setSelectedProblem(topic.id);
    setCurrentFlow(resolvedFlow);
    setCurrentStepIndex(0);

    // STEP 2: Enforce screen switch via transition state
    setMode('transitioning');
    setTimeout(() => {
      setMode('intervention');
    }, 1200);
  };

  const handleNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    console.log('[InterventionMode] advancing to step:', nextIndex, 'of', currentFlow.length);

    if (nextIndex >= currentFlow.length) {
      setMode('complete');
    } else {
      setCurrentStepIndex(nextIndex);
    }
  };

  const handleSaveJournal = (text) => {
    try {
      const existing = JSON.parse(localStorage.getItem('intervention_notes') || '[]');
      existing.push({ text, problem: selectedProblem, timestamp: new Date().toISOString() });
      localStorage.setItem('intervention_notes', JSON.stringify(existing));
    } catch (e) {
      console.warn('[InterventionMode] localStorage save failed:', e);
    }
  };

  // STEP 9: Completion — store in localStorage
  const handleCompletion = (rating) => {
    try {
      const existing = JSON.parse(localStorage.getItem('intervention_results') || '[]');
      existing.push({ problem: selectedProblem, rating, timestamp: new Date().toISOString() });
      localStorage.setItem('intervention_results', JSON.stringify(existing));
    } catch (e) {
      console.warn('[InterventionMode] result save failed:', e);
    }
    onClose();
  };

  // ─── RENDER: TRANSITIONING ───────────────────
  if (mode === 'transitioning') {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6">
        <div className="w-14 h-14 mb-8 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-indigo-500 animate-spin" />
        <p className="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300 text-center leading-relaxed">
          Got it. I'm here with you.<br />
          Let's take this one step at a time.
        </p>
      </div>
    );
  }

  // ─── RENDER: INTERVENTION FLOW ────────────────
  if (mode === 'intervention') {
    // STEP 7: Fail-safe guard
    if (!currentFlow || !currentFlow[currentStepIndex]) {
      console.error('[InterventionMode] FAIL-SAFE: flow or step is undefined, resetting to anxietyFlow');
      setCurrentFlow(FLOWS.anxietyFlow);
      setCurrentStepIndex(0);
      return null;
    }

    const step = currentFlow[currentStepIndex];
    console.log('[InterventionMode] rendering step index:', currentStepIndex, 'type:', step.type);

    return (
      <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-900 flex flex-col">
        {/* Progress header */}
        <div className="h-16 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex gap-2 items-center">
            {currentFlow.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i < currentStepIndex
                    ? 'w-5 bg-indigo-300 dark:bg-indigo-700'
                    : i === currentStepIndex
                    ? 'w-6 bg-indigo-600'
                    : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-slate-400">
              {currentStepIndex + 1}/{currentFlow.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step content — keyed by index to force re-mount on step change */}
        <div className="flex-1 overflow-hidden flex items-center justify-center" key={`step-${currentStepIndex}`}>
          {/* STEP 6: Switch on step type — NO empty default */}
          {step.type === 'text' && (
            <TextStep step={step} onNext={handleNextStep} />
          )}
          {step.type === 'breathing' && (
            <BreathingStep step={step} onNext={handleNextStep} />
          )}
          {step.type === 'grounding' && (
            <GroundingStep step={step} onNext={handleNextStep} />
          )}
          {step.type === 'journal' && (
            <JournalStep step={step} onNext={handleNextStep} onSave={handleSaveJournal} />
          )}
          {step.type === 'timer' && (
            <TimerStep step={step} onNext={handleNextStep} />
          )}
          {step.type === 'feedback' && (
            <FeedbackStep onComplete={handleCompletion} />
          )}
          {/* STEP 7: Fallback for unknown type */}
          {!['text', 'breathing', 'grounding', 'journal', 'timer', 'feedback'].includes(step.type) && (
            <TextStep step={{ content: step.content || 'Take a moment for yourself.' }} onNext={handleNextStep} />
          )}
        </div>
      </div>
    );
  }

  // ─── RENDER: SELECTION (default) ─────────────
  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-md w-full px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">💬</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          What would you like support with today?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Select a topic and I'll guide you through it, one step at a time.
        </p>

        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pb-2 px-1">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicSelect(topic)}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all text-left group"
            >
              <span className="text-2xl">{topic.emoji}</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                {topic.label}
              </span>
              <ArrowRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </button>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
            <span>🔒</span> Your responses are strictly private and stored only on your device.
          </p>
        </div>
      </div>
    </div>
  );
}
