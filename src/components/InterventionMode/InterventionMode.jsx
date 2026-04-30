import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { MoodCheckIn, BubbleBurst, GratitudeJar, AffirmationCards, BodyScan, BurnThought } from './GameSteps';

// ── CSS-var helpers ─────────────────────────────────────────────────────────
const overlay = { position:'fixed', inset:0, zIndex:100, backgroundColor:'var(--color-background)', display:'flex', flexDirection:'column' };
const btnPrimary = { background:'#0F766E', color:'#fff', border:'none', borderRadius:9999, padding:'0.75rem 2rem', fontWeight:600, fontSize:'0.95rem', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8, boxShadow:'0 4px 14px rgba(15,118,110,0.30)', transition:'all 0.2s' };
const btnGhost = { background:'transparent', color:'var(--color-text-primary)', border:'1.5px solid var(--color-border)', borderRadius:9999, padding:'0.75rem 2rem', fontWeight:500, fontSize:'0.9rem', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8, transition:'all 0.2s' };

// ── FLOWS ───────────────────────────────────────────────────────────────────
const FLOWS = {
  anxietyFlow: [
    { type:'text',         content:"I'm here with you. Let's take this one breath at a time." },
    { type:'mood_checkin', content:"How intense is your anxiety right now?" },
    { type:'breathing',    content:"Let's do box breathing together — in 4, hold 4, out 4, hold 4." },
    { type:'bubble_burst', content:"Tap each worry bubble to release it", bubbles:['Worry','Pressure','What if?','Doubt','Fear','Tension','Overthinking','Dread'] },
    { type:'grounding',    content:"Name 5 things you can see · 4 you can touch · 3 you can hear · 2 you can smell · 1 good thing about yourself." },
    { type:'affirmations', content:"Hold on to one of these", cards:["This anxiety is temporary. It will pass.","You've handled hard days before. You can handle this one.","Your feelings are valid — and you are safe right now.","Slow down. One breath at a time is enough.","You are stronger than this feeling."] },
    { type:'text',         content:"You did that. Every breath was an act of courage. Well done." },
    { type:'feedback' },
  ],
  lowMoodFlow: [
    { type:'text',         content:"It's okay to not be okay. I'm really glad you're here." },
    { type:'mood_checkin', content:"How are you feeling right now?" },
    { type:'journal',      content:"What's been weighing on your heart? You can say anything here.", placeholder:"Today I'm feeling..." },
    { type:'gratitude',    content:"Let's find 3 small things that still feel okay" },
    { type:'body_scan',    content:"Let's release some of the weight from your body" },
    { type:'affirmations', content:"A few things worth remembering", cards:["You don't have to feel okay all the time.","Small moments of peace count too.","You are allowed to rest.","Your presence in this world matters.","One step forward is still forward."] },
    { type:'text',         content:"You showed up for yourself today. That is not a small thing." },
    { type:'feedback' },
  ],
  overwhelmedFlow: [
    { type:'mood_checkin', content:"How overwhelmed are you feeling right now?" },
    { type:'burn_thought', content:"What is the biggest thing weighing on you right now?" },
    { type:'bubble_burst', content:"Let's pop these stressors one by one", bubbles:['Deadline','Expectations','Too much','Not enough','Backlog','People','Decisions','Uncertainty'] },
    { type:'text',         content:"Now breathe. You only need to find ONE tiny next step — not solve everything." },
    { type:'timer',        content:"Focus on that one tiny step for 5 minutes. Nothing else.", duration:300 },
    { type:'affirmations', content:"Remember", cards:["You don't have to do everything today.","Progress over perfection, always.","Done is better than perfect.","Rest is part of the process.","You've already handled harder things."] },
    { type:'text',         content:"You took control today. That took real strength." },
    { type:'feedback' },
  ],
  focusFlow: [
    { type:'text',         content:"Let's completely reset your focus. Start fresh — right now." },
    { type:'body_scan',    content:"Release physical tension before we begin" },
    { type:'breathing',    content:"One deep breath reset — in 4, hold 4, out 4." },
    { type:'affirmations', content:"Set your intention", cards:["One thing at a time.","My focus is a muscle. I'm training it right now.","Distractions are temporary. My goal is not.","I choose where my attention goes.","Progress happens in small focused bursts."] },
    { type:'timer',        content:"10 minutes of pure focus. Close other tabs. One task only.", duration:600 },
    { type:'text',         content:"Well done! Your brain just did a real workout. Keep going." },
    { type:'feedback' },
  ],
  bubbleFlow: [
    { type: 'bubble_burst', content: "Pop away the stress" },
    { type: 'feedback' }
  ],
  burnFlow: [
    { type: 'burn_thought', content: "Release a Negative Thought" },
    { type: 'feedback' }
  ]
};

const TOPIC_TO_FLOW = {
  anxiety:'anxietyFlow', low_mood:'lowMoodFlow', relationships:'lowMoodFlow',
  career:'overwhelmedFlow', academic:'overwhelmedFlow', self:'overwhelmedFlow', identity:'lowMoodFlow',
};

const TOPICS = [
  { id:'anxiety',       label:'Anxiety / Stress',            emoji:'😰' },
  { id:'low_mood',      label:'Low Mood',                    emoji:'🌧️' },
  { id:'relationships', label:'Relationships',               emoji:'❤️' },
  { id:'career',        label:'Career / Work',               emoji:'💼' },
  { id:'academic',      label:'Academic Pressure',           emoji:'📚' },
  { id:'self',          label:'Self Improvement',            emoji:'🌱' },
  { id:'identity',      label:'Identity & Personal',         emoji:'👤' },
];

// ── Basic Step Components ───────────────────────────────────────────────────

function TextStep({ step, onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6 animate-fade-in-up" style={{ maxWidth:440, margin:'0 auto' }}>
      <p style={{ color:'var(--color-text-primary)', fontSize:'1.7rem', fontWeight:700, lineHeight:1.4, marginBottom:40 }}>{step.content}</p>
      <button style={btnPrimary} onClick={onNext}>Continue <ArrowRight size={18} /></button>
    </div>
  );
}

function BreathingStep({ step, onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6 animate-fade-in-up">
      <p style={{ color:'var(--color-text-secondary)', fontSize:'1rem', fontWeight:500, maxWidth:340, marginBottom:40 }}>{step.content}</p>
      <div style={{ position:'relative', width:200, height:200, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:40 }}>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'3px solid var(--color-border)' }} />
        <div className="animate-ping" style={{ position:'absolute', inset:0, borderRadius:'50%', background:'rgba(15,118,110,0.15)', animationDuration:'8s' }} />
        <div className="animate-pulse" style={{ width:120, height:120, borderRadius:'50%', background:'linear-gradient(135deg,#0F766E,#0EA5E9)', boxShadow:'0 8px 32px rgba(15,118,110,0.35)', animationDuration:'4s' }} />
      </div>
      <button style={btnGhost} onClick={onNext}>I'm ready to continue</button>
    </div>
  );
}

function GroundingStep({ step, onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6 animate-fade-in-up" style={{ maxWidth:420, margin:'0 auto' }}>
      <p style={{ color:'var(--color-text-primary)', fontSize:'1.5rem', fontWeight:700, marginBottom:12 }}>5-4-3-2-1 Grounding</p>
      <p style={{ color:'var(--color-text-secondary)', lineHeight:1.7, marginBottom:40 }}>{step.content}</p>
      <button style={btnPrimary} onClick={onNext}>Done <ArrowRight size={18} /></button>
    </div>
  );
}

function JournalStep({ step, onNext, onSave }) {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 animate-fade-in-up" style={{ maxWidth:520, margin:'0 auto', width:'100%' }}>
      <p style={{ color:'var(--color-text-primary)', fontSize:'1.4rem', fontWeight:700, textAlign:'center', marginBottom:24 }}>{step.content}</p>
      <textarea autoFocus value={value} onChange={e=>setValue(e.target.value)} placeholder={step.placeholder||'Type here...'} className="t-input" style={{ height:160, resize:'none', marginBottom:20 }} />
      <button style={btnPrimary} onClick={() => { if(value.trim()) onSave?.(value.trim()); onNext(); }}>
        {value.trim()?'Save & Continue':'Skip'} <ArrowRight size={18} />
      </button>
    </div>
  );
}

function TimerStep({ step, onNext }) {
  const [timeLeft, setTimeLeft] = useState(step.duration);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!active || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft(t=>t-1), 1000);
    return () => clearInterval(id);
  }, [active, timeLeft]);
  useEffect(() => { if (timeLeft===0) setActive(false); }, [timeLeft]);
  const mins = Math.floor(timeLeft/60), secs = timeLeft%60;
  const pct = ((step.duration-timeLeft)/step.duration)*100;
  const circ = 2*Math.PI*48;
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6 animate-fade-in-up">
      <p style={{ color:'var(--color-text-secondary)', fontSize:'1rem', maxWidth:320, marginBottom:32 }}>{step.content}</p>
      <div style={{ position:'relative', width:220, height:220, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:32, background:'var(--color-card)', borderRadius:'50%', boxShadow:'0 4px 20px rgba(15,118,110,0.12)' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', transform:'rotate(-90deg)' }} viewBox="0 0 100 100">
          <circle stroke="var(--color-border)" strokeWidth="4" cx="50" cy="50" r="48" fill="transparent"/>
          <circle stroke="#0F766E" strokeWidth="4" cx="50" cy="50" r="48" fill="transparent"
            strokeDasharray={circ} strokeDashoffset={circ-(circ*pct)/100} strokeLinecap="round"
            style={{ transition:'stroke-dashoffset 1s linear' }}/>
        </svg>
        <span style={{ color:'var(--color-text-primary)', fontSize:'2.8rem', fontWeight:700, fontFamily:'monospace', letterSpacing:'-2px' }}>
          {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
        </span>
      </div>
      {timeLeft===0
        ? <button style={{ ...btnPrimary, background:'#6EE7B7' }} onClick={onNext}><CheckCircle size={18}/>Done!</button>
        : active
          ? <button style={btnGhost} onClick={()=>setActive(false)}>Pause</button>
          : <button style={btnPrimary} onClick={()=>setActive(true)}><Clock size={18}/>{timeLeft<step.duration?'Resume':'Start Timer'}</button>
      }
    </div>
  );
}

function FeedbackStep({ onComplete }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6 animate-fade-in-up" style={{ maxWidth:340, margin:'0 auto' }}>
      <p style={{ color:'var(--color-text-primary)', fontSize:'2rem', fontWeight:700, marginBottom:32 }}>Did this help?</p>
      {['Yes, a lot 😊','A little bit 🙂','Not really 😔'].map(opt=>(
        <button key={opt} onClick={()=>onComplete(opt)} style={{ ...btnGhost, width:'100%', marginBottom:10, justifyContent:'center', fontSize:'1rem', padding:'1rem' }}>{opt}</button>
      ))}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function InterventionMode({ onClose, initialFlow = null }) {
  const [mode, setMode] = useState(initialFlow ? 'transitioning' : 'selection');
  const [selectedProblem, setSelectedProblem] = useState(initialFlow || null);
  const [currentFlow, setCurrentFlow] = useState(initialFlow ? FLOWS[initialFlow] : null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (initialFlow && FLOWS[initialFlow]) {
      setTimeout(() => setMode('intervention'), 800);
    }
  }, [initialFlow]);

  const handleTopicSelect = (topic) => {
    const flowId = TOPIC_TO_FLOW[topic.id];
    const flow = FLOWS[flowId] || FLOWS.anxietyFlow;
    console.log('[Intervention] topic:', topic.id, '| flow:', flowId, '| steps:', flow.length);
    setSelectedProblem(topic.id); setCurrentFlow(flow); setStepIndex(0);
    setMode('transitioning');
    setTimeout(() => setMode('intervention'), 1200);
  };

  const handleNext = () => {
    const next = stepIndex + 1;
    if (next >= currentFlow.length) setMode('complete'); else setStepIndex(next);
  };

  const handleSave = (text) => {
    try { const p=JSON.parse(localStorage.getItem('intervention_notes')||'[]'); p.push({text,problem:selectedProblem,ts:new Date().toISOString()}); localStorage.setItem('intervention_notes',JSON.stringify(p)); } catch(e){}
  };

  const handleCompletion = (rating) => {
    try { const p=JSON.parse(localStorage.getItem('intervention_results')||'[]'); p.push({problem:selectedProblem,rating,ts:new Date().toISOString()}); localStorage.setItem('intervention_results',JSON.stringify(p)); } catch(e){}
    onClose();
  };

  // ── TRANSITIONING ───────────────────────────────────────────────────────
  if (mode==='transitioning') return (
    <div style={{ ...overlay, alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:52, height:52, borderRadius:'50%', border:'4px solid var(--color-border)', borderTopColor:'#0F766E', animation:'spin 0.8s linear infinite', marginBottom:28 }}/>
      <p style={{ color:'var(--color-text-secondary)', textAlign:'center', fontSize:'1.15rem', fontWeight:500, lineHeight:1.6 }}>Got it. I'm here with you.<br/>Let's take this one step at a time.</p>
    </div>
  );

  // ── INTERVENTION ────────────────────────────────────────────────────────
  if (mode==='intervention') {
    if (!currentFlow?.[stepIndex]) { setCurrentFlow(FLOWS.anxietyFlow); setStepIndex(0); return null; }
    const step = currentFlow[stepIndex];
    return (
      <div style={overlay}>
        {/* Progress */}
        <div style={{ height:64, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            {currentFlow.map((_,i)=>(
              <div key={i} style={{ height:6, borderRadius:9999, background:i<=stepIndex?'#0F766E':'var(--color-border)', width:i===stepIndex?24:i<stepIndex?14:6, transition:'all 0.4s' }}/>
            ))}
            <span style={{ marginLeft:8, fontSize:11, color:'var(--color-text-secondary)' }}>{stepIndex+1}/{currentFlow.length}</span>
          </div>
          <button onClick={onClose} style={{ background:'transparent', border:'none', cursor:'pointer', color:'var(--color-text-secondary)', padding:8, borderRadius:12 }}><X size={24}/></button>
        </div>
        {/* Step */}
        <div style={{ flex:1, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', width:'100%' }} key={`step-${stepIndex}`}>
          {step.type==='text'         && <TextStep         step={step} onNext={handleNext}/>}
          {step.type==='breathing'    && <BreathingStep    step={step} onNext={handleNext}/>}
          {step.type==='grounding'    && <GroundingStep    step={step} onNext={handleNext}/>}
          {step.type==='journal'      && <JournalStep      step={step} onNext={handleNext} onSave={handleSave}/>}
          {step.type==='timer'        && <TimerStep        step={step} onNext={handleNext}/>}
          {step.type==='feedback'     && <FeedbackStep     onComplete={handleCompletion}/>}
          {step.type==='mood_checkin' && <MoodCheckIn      step={step} onNext={handleNext} onSave={handleSave}/>}
          {step.type==='bubble_burst' && <BubbleBurst      step={step} onNext={handleNext}/>}
          {step.type==='gratitude'    && <GratitudeJar     step={step} onNext={handleNext} onSave={handleSave}/>}
          {step.type==='affirmations' && <AffirmationCards step={step} onNext={handleNext}/>}
          {step.type==='body_scan'    && <BodyScan         step={step} onNext={handleNext}/>}
          {step.type==='burn_thought' && <BurnThought      step={step} onNext={handleNext} onSave={handleSave}/>}
          {!['text','breathing','grounding','journal','timer','feedback','mood_checkin','bubble_burst','gratitude','affirmations','body_scan','burn_thought'].includes(step.type) && (
            <TextStep step={{ content: step.content||'Take a moment for yourself.' }} onNext={handleNext}/>
          )}
        </div>
      </div>
    );
  }

  // ── COMPLETE ────────────────────────────────────────────────────────────
  if (mode==='complete') return (
    <div style={{ ...overlay, alignItems:'center', justifyContent:'center' }}>
      <FeedbackStep onComplete={handleCompletion}/>
    </div>
  );

  // ── TOPIC SELECTION ─────────────────────────────────────────────────────
  return (
    <div style={{ ...overlay, alignItems:'center', justifyContent:'center' }}>
      <button onClick={onClose} style={{ position:'absolute', top:24, right:24, background:'transparent', border:'none', cursor:'pointer', color:'var(--color-text-secondary)', padding:8, borderRadius:12 }}><X size={24}/></button>
      <div style={{ maxWidth:480, width:'100%', padding:'0 24px', textAlign:'center' }} className="animate-page-enter">
        <div style={{ width:64, height:64, borderRadius:16, margin:'0 auto 24px', background:'linear-gradient(135deg,#0F766E,#0EA5E9)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(15,118,110,0.35)', fontSize:28 }}>💬</div>
        <h1 style={{ color:'var(--color-text-primary)', fontSize:'1.6rem', fontWeight:700, marginBottom:8 }}>What would you like support with today?</h1>
        <p style={{ color:'var(--color-text-secondary)', fontSize:'0.9rem', marginBottom:28 }}>Select a topic and I'll guide you through interactive steps — one at a time.</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8, maxHeight:'50vh', overflowY:'auto', paddingBottom:4 }}>
          {TOPICS.map(topic=>(
            <button key={topic.id} onClick={()=>handleTopicSelect(topic)}
              style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 18px', borderRadius:14, background:'var(--color-card)', border:'1.5px solid var(--color-border)', cursor:'pointer', textAlign:'left', transition:'all 0.2s', boxShadow:'0 2px 8px rgba(15,118,110,0.06)' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor='#0F766E'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(15,118,110,0.12)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.boxShadow='0 2px 8px rgba(192,132,252,0.06)'; }}>
              <span style={{ fontSize:22 }}>{topic.emoji}</span>
              <span style={{ color:'var(--color-text-primary)', fontWeight:500, fontSize:'0.95rem', flex:1 }}>{topic.label}</span>
              <ArrowRight size={16} style={{ color:'var(--color-text-secondary)', flexShrink:0 }}/>
            </button>
          ))}
        </div>
        <div style={{ marginTop:20, paddingTop:16, borderTop:'1px solid var(--color-border)' }}>
          <p style={{ color:'var(--color-text-secondary)', fontSize:'0.75rem' }}>🔒 Private &amp; stored only on your device</p>
        </div>
      </div>
    </div>
  );
}
