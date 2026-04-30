import React, { useState } from 'react';
import { ArrowRight, Check, RefreshCw } from 'lucide-react';

const C = { primary: '#0F766E', pink: '#0EA5E9', accent: '#14B8A6', success: '#6EE7B7' };
const btn = { background: C.primary, color: '#fff', border: 'none', borderRadius: 9999, padding: '0.75rem 2rem', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' };
const card = { background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 16, boxShadow: '0 4px 16px rgba(15,118,110,0.10)' };

// ── Mood Check-In ──────────────────────────────────────────────────────────
export function MoodCheckIn({ step, onNext, onSave }) {
  const moods = ['😢', '😟', '😐', '🙂', '😊'];
  const labels = ['Very Low', 'Low', 'Okay', 'Good', 'Great'];
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6 animate-fade-in-up" style={{ maxWidth: 480, margin: '0 auto' }}>
      <p style={{ color: 'var(--color-text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>{step.content}</p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 32 }}>Tap the one that feels right</p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
        {moods.map((e, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            fontSize: 40, background: selected === i ? 'rgba(15,118,110,0.12)' : 'var(--color-surface)',
            border: selected === i ? '2px solid #0F766E' : '2px solid var(--color-border)',
            borderRadius: 16, padding: '12px 14px', cursor: 'pointer', transition: 'all 0.2s',
            transform: selected === i ? 'scale(1.15)' : 'scale(1)',
          }} title={labels[i]}>{e}</button>
        ))}
      </div>
      {selected !== null && <p style={{ color: 'var(--color-text-secondary)', marginBottom: 20, fontSize: '0.9rem' }}>Feeling <strong style={{ color: C.primary }}>{labels[selected]}</strong> — that's okay.</p>}
      <button style={{ ...btn, opacity: selected === null ? 0.5 : 1 }} disabled={selected === null}
        onClick={() => { onSave?.(`Mood: ${labels[selected]}`); onNext(); }}>
        Continue <ArrowRight style={{ display: 'inline', marginLeft: 6, width: 16, height: 16 }} />
      </button>
    </div>
  );
}

// ── Bubble Burst ───────────────────────────────────────────────────────────
export function BubbleBurst({ step, onNext }) {
  const words = step.bubbles || ['Worry', 'Stress', 'Pressure', 'Doubt', 'Fear', 'Tension', 'Anxiety', 'Dread'];
  const [popped, setPopped] = useState(new Set());
  const positions = [
    { top: '10%', left: '15%' }, { top: '8%', left: '55%' }, { top: '25%', left: '75%' },
    { top: '45%', left: '60%' }, { top: '55%', left: '20%' }, { top: '30%', left: '35%' },
    { top: '65%', left: '48%' }, { top: '20%', left: '8%' },
  ];
  const allPopped = popped.size === words.length;
  
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 animate-fade-in-up">
      <p style={{ color: 'var(--color-text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>{step.content}</p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: 20 }}>Tap each bubble to release it</p>
      <div style={{ position: 'relative', width: '100%', maxWidth: 480, height: 280, marginBottom: 24 }}>
        {words.map((w, i) => (
          <button key={w} onClick={() => {
            const newPopped = new Set(popped);
            newPopped.add(i);
            setPopped(newPopped);
            if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
          }}
            style={{
              position: 'absolute', ...positions[i % positions.length],
              opacity: popped.has(i) ? 0 : 1, transform: popped.has(i) ? 'scale(0)' : 'scale(1)',
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              background: `linear-gradient(135deg, rgba(15,118,110,0.18), rgba(14,165,233,0.18))`,
              border: '1.5px solid rgba(15,118,110,0.35)', borderRadius: 9999,
              padding: '8px 18px', fontSize: '0.8rem', fontWeight: 600,
              color: 'var(--color-text-primary)', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(15,118,110,0.15)',
            }}>{w}</button>
        ))}
      </div>
      {allPopped
        ? <button style={btn} onClick={onNext}>All released! Continue <ArrowRight style={{ display:'inline', marginLeft:6, width:16, height:16 }} /></button>
        : <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{words.length - popped.size} bubbles remaining</p>
      }
    </div>
  );
}

// ── Gratitude Jar ──────────────────────────────────────────────────────────
export function GratitudeJar({ step, onNext, onSave }) {
  const [items, setItems] = useState(['', '', '']);
  const filled = items.filter(i => i.trim().length > 0).length;
  const pct = (filled / 3) * 100;
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 animate-fade-in-up" style={{ maxWidth: 460, margin: '0 auto' }}>
      <p style={{ color: 'var(--color-text-primary)', fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>{step.content}</p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: 24, textAlign: 'center' }}>Even small things count 🌸</p>
      {/* Jar visual */}
      <div style={{ width: 80, height: 100, border: '3px solid #0F766E', borderRadius: '0 0 20px 20px', borderTop: 'none', position: 'relative', overflow: 'hidden', marginBottom: 24, background: 'rgba(15,118,110,0.05)' }}>
        <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${pct}%`, background: 'linear-gradient(180deg, rgba(14,165,233,0.5), rgba(15,118,110,0.5))', transition: 'height 0.5s ease' }} />
        <div style={{ position: 'absolute', top: -14, left: -8, right: -8, height: 14, background: '#0F766E', borderRadius: '6px 6px 0 0' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginBottom: 24 }}>
        {items.map((val, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.2rem' }}>{['🌟','🌸','🍀'][i]}</span>
            <input value={val} onChange={e => { const n=[...items]; n[i]=e.target.value; setItems(n); }}
              placeholder={['Something I appreciate today...', 'A person who makes me feel good...', 'Something small that went right...'][i]}
              className="t-input" style={{ flex: 1 }} />
          </div>
        ))}
      </div>
      <button style={{ ...btn, opacity: filled === 0 ? 0.5 : 1 }} disabled={filled === 0}
        onClick={() => { onSave?.(items.filter(i=>i.trim()).join(' | ')); onNext(); }}>
        {filled === 3 ? '✨ Jar is full! Continue' : `Continue (${filled}/3 filled)`}
      </button>
    </div>
  );
}

// ── Affirmation Cards ──────────────────────────────────────────────────────
export function AffirmationCards({ step, onNext }) {
  const cards = step.cards || [
    "You are doing the best you can, and that is enough.",
    "This feeling is temporary. You have survived hard days before.",
    "You deserve kindness — especially from yourself.",
    "Small steps still move you forward.",
    "You are not alone in this.",
  ];
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const next = () => { setFade(false); setTimeout(() => { setIdx(i => i+1); setFade(true); }, 250); };
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6 animate-fade-in-up" style={{ maxWidth: 440, margin: '0 auto' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Affirmation {idx+1} of {cards.length}</p>
      <div style={{ ...card, padding: '40px 32px', marginBottom: 32, opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.25s ease', width: '100%' }}>
        <p style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.55 }}>"{cards[idx]}"</p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {idx < cards.length - 1
          ? <button style={btn} onClick={next}>Next affirmation <ArrowRight style={{ display:'inline', marginLeft:6, width:16, height:16 }} /></button>
          : <button style={btn} onClick={onNext}>Done <Check style={{ display:'inline', marginLeft:6, width:16, height:16 }} /></button>
        }
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
        {cards.map((_,i) => <div key={i} style={{ width: i===idx?20:6, height:6, borderRadius:9999, background: i===idx?C.primary:'var(--color-border)', transition:'all 0.3s' }} />)}
      </div>
    </div>
  );
}

// ── Body Scan ──────────────────────────────────────────────────────────────
export function BodyScan({ step, onNext }) {
  const parts = ['Head & Face', 'Neck & Shoulders', 'Arms & Hands', 'Chest & Heart', 'Belly', 'Legs & Feet'];
  const [relaxed, setRelaxed] = useState(new Set());
  const toggle = p => setRelaxed(s => { const n=new Set(s); n.has(p)?n.delete(p):n.add(p); return n; });
  const allDone = relaxed.size === parts.length;
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 animate-fade-in-up" style={{ maxWidth: 440, margin: '0 auto' }}>
      <p style={{ color: 'var(--color-text-primary)', fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>{step.content}</p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: 24, textAlign: 'center' }}>Tap each area, breathe in, then release tension as you breathe out</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginBottom: 28 }}>
        {parts.map(p => (
          <button key={p} onClick={() => toggle(p)} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12,
            background: relaxed.has(p) ? 'rgba(110,231,183,0.12)' : 'var(--color-surface)',
            border: `1.5px solid ${relaxed.has(p) ? '#6EE7B7' : 'var(--color-border)'}`,
            cursor: 'pointer', transition: 'all 0.25s', width: '100%',
          }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: relaxed.has(p) ? '#6EE7B7' : 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s' }}>
              {relaxed.has(p) && <Check style={{ width: 14, height: 14, color: '#fff' }} />}
            </div>
            <span style={{ color: relaxed.has(p) ? '#38A085' : 'var(--color-text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>{p}</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: relaxed.has(p) ? '#6EE7B7' : 'var(--color-placeholder)' }}>
              {relaxed.has(p) ? 'Relaxed ✓' : 'Tap to relax'}
            </span>
          </button>
        ))}
      </div>
      <button style={{ ...btn, opacity: !allDone ? 0.6 : 1 }} onClick={onNext} disabled={!allDone}>
        {allDone ? 'Body scan complete! Continue' : `${relaxed.size}/${parts.length} areas relaxed`}
      </button>
    </div>
  );
}

// ── Burn the Thought ───────────────────────────────────────────────────────
export function BurnThought({ step, onNext, onSave }) {
  const [text, setText] = useState('');
  const [burning, setBurning] = useState(false);
  const [burned, setBurned] = useState(false);

  const handleBurn = () => {
    if (!text.trim()) return;
    setBurning(true);
    // Vibrate lightly if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }
    setTimeout(() => {
      setBurned(true);
      setBurning(false);
      onSave?.(`Burned thought: ${text}`);
    }, 2500);
  };

  if (burned) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 animate-fade-in-up" style={{ maxWidth: 440, margin: '0 auto' }}>
        <p style={{ color: 'var(--color-text-primary)', fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', marginBottom: 24, lineHeight: 1.5 }}>
          You don't have to hold onto this anymore.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ ...btn, background: 'transparent', color: 'var(--color-text-primary)', border: '1.5px solid var(--color-border)' }} onClick={() => { setBurned(false); setText(''); }}>
            Write another
          </button>
          <button style={btn} onClick={onNext}>
            Done <Check style={{ display: 'inline', marginLeft: 6, width: 16, height: 16 }} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 animate-fade-in-up" style={{ maxWidth: 440, margin: '0 auto', width: '100%' }}>
      <p style={{ color: 'var(--color-text-primary)', fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>
        {step.content || "Release a Thought"}
      </p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 24, textAlign: 'center' }}>
        Write down what's bothering you, then let it go.
      </p>
      
      <div className={burning ? "animate-fire-burn paper-card" : "paper-card"} style={{
        padding: '24px',
        width: '100%',
        marginBottom: 24,
        borderRadius: 8
      }}>
        <textarea
          autoFocus
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write what you want to let go of..."
          style={{
            width: '100%', height: 140, resize: 'none', background: 'transparent', 
            border: 'none', outline: 'none', color: 'inherit',
            fontSize: '1.05rem', lineHeight: 1.5, fontFamily: 'inherit'
          }}
          disabled={burning}
        />
      </div>

      <button
        style={{ ...btn, opacity: (!text.trim() || burning) ? 0.5 : 1, transition: 'all 0.3s' }}
        disabled={!text.trim() || burning}
        onClick={handleBurn}
      >
        {burning ? 'Releasing...' : 'Burn Thought'}
      </button>
    </div>
  );
}
