import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Check, Play, Pause, RotateCcw, ThumbsUp, ThumbsDown, Pencil } from 'lucide-react';
import interventionFlows from '@/services/interventionFlows';
import useFollowup from '@/hooks/useFollowup';
import useJournal from '@/hooks/useJournal';

/**
 * InterventionMode — Full-screen guided intervention UI.
 * Renders steps sequentially from the flow config in interventionFlows.js.
 * Each step type has its own renderer. All logic is driven by data, not hardcoded.
 */
export default function InterventionMode({ onClose }) {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { addFollowup } = useFollowup();
  const { addEntry } = useJournal();

  // === FEELING SELECTION SCREEN ===
  if (!selectedFlow) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="max-w-md w-full px-6 text-center animate-page-enter">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20">
            <span className="text-3xl">💙</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">What are you feeling right now?</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">There are no wrong answers. Pick what resonates most.</p>

          <div className="space-y-3">
            {Object.values(interventionFlows).map((flow) => (
              <button
                key={flow.id}
                onClick={() => setSelectedFlow(flow)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500 transition-all text-left group"
              >
                <span className="text-3xl">{flow.emoji}</span>
                <span className="text-base font-medium text-slate-700 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{flow.label}</span>
                <ArrowRight className="w-4 h-4 ml-auto text-slate-300 dark:text-slate-600 group-hover:text-teal-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === GUIDED FLOW ===
  const flow = selectedFlow;
  const step = flow.steps[currentStep];
  const isLastStep = currentStep === flow.steps.length - 1;
  const progress = ((currentStep + 1) / flow.steps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleFollowup = (helpful) => {
    addFollowup(flow.id, step.id, helpful);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Minimal top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{flow.emoji}</span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{flow.label}</span>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-6">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-1 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
        <div className="max-w-lg w-full py-8 animate-page-enter" key={`${flow.id}-${currentStep}`}>
          <StepRenderer step={step} flow={flow} onNext={handleNext} onFollowup={handleFollowup} addJournalEntry={addEntry} />
        </div>
      </div>
    </div>
  );
}

// === STEP RENDERER ===
function StepRenderer({ step, flow, onNext, onFollowup, addJournalEntry }) {
  switch (step.type) {
    case 'breathing': return <BreathingStep step={step} onNext={onNext} />;
    case 'grounding': return <GroundingStep step={step} onNext={onNext} />;
    case 'message': return <MessageStep step={step} onNext={onNext} />;
    case 'followup': return <FollowupStep step={step} flow={flow} onFollowup={onFollowup} />;
    case 'tiny-action': return <TinyActionStep step={step} onNext={onNext} />;
    case 'journal-prompt': return <JournalPromptStep step={step} onNext={onNext} addJournalEntry={addJournalEntry} />;
    case 'task-break': return <TaskBreakStep step={step} onNext={onNext} />;
    case 'timer': return <TimerStep step={step} onNext={onNext} />;
    case 'distraction-reset': return <DistractionResetStep step={step} onNext={onNext} />;
    default: return <MessageStep step={step} onNext={onNext} />;
  }
}

// --- Breathing Step ---
function BreathingStep({ step, onNext }) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('ready');
  const [counter, setCounter] = useState(0);
  const [cycle, setCycle] = useState(0);
  const { inhale, hold, exhale, cycles } = step.config;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    let phaseIdx = 0;
    const phases = [
      { name: 'inhale', dur: inhale },
      { name: 'hold', dur: hold },
      { name: 'exhale', dur: exhale },
    ];
    let count = phases[0].dur;
    let cyc = 0;
    setPhase(phases[0].name);
    setCounter(count);

    intervalRef.current = setInterval(() => {
      count--;
      if (count <= 0) {
        phaseIdx++;
        if (phaseIdx >= phases.length) {
          phaseIdx = 0;
          cyc++;
          setCycle(cyc);
          if (cyc >= cycles) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            setPhase('done');
            return;
          }
        }
        count = phases[phaseIdx].dur;
        setPhase(phases[phaseIdx].name);
      }
      setCounter(count);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive, inhale, hold, exhale, cycles]);

  const phaseLabels = { inhale: 'Breathe In', hold: 'Hold', exhale: 'Breathe Out', ready: 'Ready?', done: 'Done ✓' };
  const phaseColors = { inhale: 'border-blue-400 shadow-blue-200 dark:shadow-blue-900', hold: 'border-amber-400 shadow-amber-200 dark:shadow-amber-900', exhale: 'border-teal-400 shadow-teal-200 dark:shadow-teal-900', ready: 'border-slate-300', done: 'border-green-400 shadow-green-200' };
  const phaseScale = { inhale: 'scale-125', hold: 'scale-125', exhale: 'scale-75', ready: 'scale-100', done: 'scale-100' };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{step.subtitle}</p>

      <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center mx-auto mb-6 transition-all duration-1000 shadow-lg ${phaseColors[phase]} ${phaseScale[phase]}`}>
        <div className="text-center">
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{phase === 'done' ? '✓' : counter}</p>
          <p className="text-xs font-medium text-slate-500 mt-1">{phaseLabels[phase]}</p>
        </div>
      </div>

      {!isActive && phase !== 'done' && (
        <p className="text-xs text-slate-400 mb-4">Cycle {cycle + 1} of {cycles}</p>
      )}

      {phase === 'done' ? (
        <button onClick={onNext} className="px-8 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 mx-auto">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      ) : !isActive ? (
        <button onClick={() => setIsActive(true)} className="px-8 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 mx-auto">
          <Play className="w-4 h-4" /> Start Breathing
        </button>
      ) : null}
    </div>
  );
}

// --- Grounding Step ---
function GroundingStep({ step, onNext }) {
  const [senseIdx, setSenseIdx] = useState(0);
  const senses = step.config.senses;
  const current = senses[senseIdx];
  const senseEmoji = { SEE: '👁️', TOUCH: '✋', HEAR: '👂', SMELL: '👃', TASTE: '👅' };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{step.subtitle}</p>

      <div className="mb-6">
        <span className="text-5xl mb-3 block">{senseEmoji[current.sense]}</span>
        <p className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">{current.count}</p>
        <p className="text-base text-slate-600 dark:text-slate-400">{current.prompt}</p>
      </div>

      <div className="flex gap-2 justify-center mb-8">
        {senses.map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i <= senseIdx ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-600'}`} />
        ))}
      </div>

      <button
        onClick={() => senseIdx < senses.length - 1 ? setSenseIdx((s) => s + 1) : onNext()}
        className="px-8 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 mx-auto"
      >
        {senseIdx < senses.length - 1 ? <>Next Sense <ArrowRight className="w-4 h-4" /></> : <>Continue <ArrowRight className="w-4 h-4" /></>}
      </button>
    </div>
  );
}

// --- Message Step ---
function MessageStep({ step, onNext }) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{step.title}</h2>
      <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{step.subtitle}</p>
      {step.supportText && (
        <p className="text-sm text-slate-500 dark:text-slate-500 italic mb-8">{step.supportText}</p>
      )}
      <button onClick={onNext} className="px-8 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 mx-auto">
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// --- Follow-up Step ---
function FollowupStep({ step, flow, onFollowup }) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{step.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{step.subtitle}</p>

      <div className="flex gap-4 justify-center">
        <button onClick={() => onFollowup(true)} className="flex flex-col items-center gap-2 px-8 py-5 rounded-2xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 hover:border-green-400 transition-all">
          <ThumbsUp className="w-8 h-8 text-green-500" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">Yes, it helped</span>
        </button>
        <button onClick={() => onFollowup(false)} className="flex flex-col items-center gap-2 px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-400 transition-all">
          <ThumbsDown className="w-8 h-8 text-slate-400" />
          <span className="text-sm font-medium text-slate-500">Not really</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-6">Your response helps us personalize future suggestions.</p>
    </div>
  );
}

// --- Tiny Action Step ---
function TinyActionStep({ step, onNext }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{step.subtitle}</p>

      <div className="space-y-2 mb-6">
        {step.actions.map((action, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
              selected === i
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="text-2xl">{action.emoji}</span>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{action.text}</p>
              <p className="text-xs text-slate-400">{action.detail}</p>
            </div>
            {selected === i && <Check className="w-5 h-5 text-teal-500 ml-auto" />}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={selected === null}
        className="px-8 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2 mx-auto"
      >
        I did it <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// --- Journal Prompt Step ---
function JournalPromptStep({ step, onNext, addJournalEntry }) {
  const [text, setText] = useState('');

  const handleSave = () => {
    if (text.trim()) {
      addJournalEntry({ content: text.trim(), template: 'freeform', tags: ['intervention'], mood: null });
    }
    onNext();
  };

  return (
    <div className="text-center">
      <Pencil className="w-8 h-8 text-slate-300 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{step.subtitle}</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={step.prompt}
        rows={5}
        className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:border-teal-500 resize-none mb-6"
      />

      <div className="flex gap-3 justify-center">
        {step.optional && (
          <button onClick={onNext} className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Skip
          </button>
        )}
        <button onClick={handleSave} className="px-6 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2">
          {text.trim() ? 'Save & Continue' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// --- Task Break Step ---
function TaskBreakStep({ step, onNext }) {
  const [task, setTask] = useState('');
  const [firstStep, setFirstStep] = useState('');

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{step.subtitle}</p>

      <div className="space-y-4 mb-6 text-left">
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">What's overwhelming you?</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., I have too much homework"
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:border-teal-500"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">What's the tiniest first step?</label>
          <input
            type="text"
            value={firstStep}
            onChange={(e) => setFirstStep(e.target.value)}
            placeholder="e.g., Open the assignment page"
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!firstStep.trim()}
        className="px-8 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2 mx-auto"
      >
        Let's do it <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// --- Timer Step ---
function TimerStep({ step, onNext }) {
  const totalSeconds = step.config.minutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const progress = ((totalSeconds - remaining) / totalSeconds) * 100;

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{step.subtitle}</p>

      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-200 dark:text-slate-700" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="url(#timerGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 90}`} strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`} className="transition-all duration-1000" />
          <defs><linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#14b8a6" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl font-bold text-slate-800 dark:text-slate-100 font-mono">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</p>
        </div>
      </div>

      {isDone ? (
        <button onClick={onNext} className="px-8 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 mx-auto">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex gap-3 justify-center">
          <button onClick={() => setIsRunning(!isRunning)} className={`px-6 py-3 rounded-2xl text-sm font-medium flex items-center gap-2 transition-colors ${isRunning ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
            {isRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> {remaining < totalSeconds ? 'Resume' : 'Start'}</>}
          </button>
          {!isRunning && remaining < totalSeconds && (
            <button onClick={() => { setRemaining(totalSeconds); setIsDone(false); }} className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm hover:bg-slate-200 dark:hover:bg-slate-700">
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// --- Distraction Reset Step ---
function DistractionResetStep({ step, onNext }) {
  const [checked, setChecked] = useState(step.resetSteps.map(() => false));
  const allChecked = checked.every(Boolean);

  const toggle = (i) => setChecked((prev) => prev.map((v, j) => j === i ? !v : v));

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{step.subtitle}</p>

      <div className="space-y-3 mb-8 text-left">
        {step.resetSteps.map((rs, i) => (
          <button key={i} onClick={() => toggle(i)} className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${checked[i] ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked[i] ? 'border-teal-500 bg-teal-500' : 'border-slate-300 dark:border-slate-600'}`}>
              {checked[i] && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className={`text-sm ${checked[i] ? 'text-teal-700 dark:text-teal-300 line-through' : 'text-slate-600 dark:text-slate-400'}`}>{rs}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!allChecked}
        className="px-8 py-3 rounded-2xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2 mx-auto"
      >
        I'm ready to focus <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
