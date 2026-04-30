import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import {
  LayoutDashboard, BookOpen, Activity, ClipboardList, Wrench,
  BookHeart, AlertTriangle, Moon, Sun, Search, X, Menu, Heart,
  GraduationCap, Sparkles, Shield, ChevronDown, ChevronRight
} from 'lucide-react';
import useSearch from '@/hooks/useSearch';
import InterventionMode from '@/components/InterventionMode/InterventionMode';

const navSections = [
  {
    title: 'Overview',
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Learn',
    items: [
      { path: '/conditions', label: 'Knowledge Base', icon: BookOpen },
      { path: '/lifestyle', label: 'Lifestyle Factors', icon: Activity },
      { path: '/problems', label: 'Student Problems', icon: GraduationCap },
    ],
  },
  {
    title: 'Tools',
    items: [
      { path: '/assessments', label: 'Self-Assessment', icon: ClipboardList },
      { path: '/toolkit', label: 'Wellness Toolkit', icon: Wrench },
      { path: '/journal', label: 'Journal', icon: BookHeart },
      { path: '/mood', label: 'Mood Tracker', icon: Heart },
      { path: '/programs', label: 'Guided Programs', icon: Sparkles },
    ],
  },
  {
    title: 'Support',
    items: [
      { path: '/emergency', label: 'Emergency Help', icon: AlertTriangle },
    ],
  },
];

export default function Layout() {
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [interventionOpen, setInterventionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({});
  const { results } = useSearch(searchQuery);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSection = (title) => {
    setCollapsedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleSearchSelect = (type, id) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (type === 'condition') navigate(`/conditions/${id}`);
    else if (type === 'factor') navigate(`/lifestyle/${id}`);
    else if (type === 'problem') navigate(`/problems/${id}`);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-3">
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #C084FC, #F9A8D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(192,132,252,0.30)',
          }}>
            <Heart className="w-5 h-5" style={{ color: '#fff' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>MindWell</h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-placeholder)', marginTop: 1 }}>Student Mental Health</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 12px' }}>
        {navSections.map((section) => (
          <div key={section.title} style={{ marginBottom: 4 }}>
            <button
              onClick={() => toggleSection(section.title)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '6px 10px 4px',
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                color: 'var(--color-placeholder)', textTransform: 'uppercase',
                background: 'transparent', border: 'none', cursor: 'pointer',
              }}
            >
              {section.title}
              {collapsedSections[section.title]
                ? <ChevronRight style={{ width: 12, height: 12 }} />
                : <ChevronDown style={{ width: 12, height: 12 }} />}
            </button>
            {!collapsedSections[section.title] && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', borderRadius: 10,
                        fontSize: '0.875rem', fontWeight: isActive ? 600 : 500,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        background: isActive ? 'var(--color-text-primary)' : 'transparent',
                        color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                      }}
                    >
                      <Icon style={{ width: 16, height: 16, color: isActive ? '#F9A8D4' : '#B5B2C2', flexShrink: 0 }} />
                      <span>{item.label}</span>
                      {item.path === '/emergency' && (
                        <span style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#F87171', display: 'inline-block' }} />
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom controls */}
      <div style={{ padding: '12px 12px 16px', borderTop: '1px solid #F0E8F8' }}>
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '9px 12px', borderRadius: 10,
            fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)',
            background: 'transparent', border: 'none', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {darkMode
            ? <Sun style={{ width: 16, height: 16 }} />
            : <Moon style={{ width: 16, height: 16 }} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <div style={{
          marginTop: 8, padding: '10px 12px', borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(192,132,252,0.08), rgba(249,168,212,0.08))',
          border: '1px solid rgba(192,132,252,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Shield style={{ width: 13, height: 13, color: '#C084FC' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Privacy First</span>
          </div>
          <p style={{ fontSize: '0.68rem', color: 'var(--color-placeholder)', lineHeight: 1.4 }}>All data stored locally on your device. Nothing is shared.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #F0E8F8' }}>
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800 dark:text-white">MindWell</span>
          </div>
          <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 shadow-2xl animate-slide-in">
            <button onClick={() => setSidebarOpen(false)} className="absolute right-3 top-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
              <X className="w-4 h-4" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 z-30" style={{ background: 'var(--color-card)', borderRight: '1px solid var(--color-border)' }}>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 sticky top-0 z-20" style={{ background: 'var(--color-card)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)', opacity: 0.96 }}>
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-72"
            >
              <Search className="w-4 h-4" />
              <span>Search conditions, tools...</span>
              <kbd className="ml-auto px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono">⌘K</kbd>
            </button>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          <Outlet />
        </div>
      </main>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} />
          <div className="relative w-full max-w-xl mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conditions, lifestyle factors, problems..."
                className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none text-sm"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            {searchQuery.length >= 2 && (
              <div className="max-h-80 overflow-y-auto p-2">
                {results.total === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-slate-400">No results found for "{searchQuery}"</p>
                ) : (
                  <>
                    {results.conditions.map((c) => (
                      <button key={c.id} onClick={() => handleSearchSelect('condition', c.id)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors">
                        <span className="text-xl">{c.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{c.title}</p>
                          <p className="text-xs text-slate-400">Condition</p>
                        </div>
                      </button>
                    ))}
                    {results.factors.map((f) => (
                      <button key={f.id} onClick={() => handleSearchSelect('factor', f.id)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors">
                        <span className="text-xl">{f.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{f.title}</p>
                          <p className="text-xs text-slate-400">Lifestyle Factor</p>
                        </div>
                      </button>
                    ))}
                    {results.problems.map((p) => (
                      <button key={p.id} onClick={() => handleSearchSelect('problem', p.id)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors">
                        <span className="text-xl">{p.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{p.title}</p>
                          <p className="text-xs text-slate-400">Student Problem</p>
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3 items-end">
        <button
          onClick={() => setInterventionOpen(true)}
          className="px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
          style={{ background: '#C084FC', color: '#fff', boxShadow: '0 4px 20px rgba(192,132,252,0.40)' }}
        >
          <Heart className="w-5 h-5 group-hover:animate-pulse" style={{ color: '#F9A8D4' }} />
          <span className="text-sm font-medium pr-1">I'm not okay right now</span>
        </button>
        <button
          onClick={() => navigate('/emergency')}
          className="w-14 h-14 rounded-full text-white shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center group"
          style={{ background: 'linear-gradient(135deg, #F87171, #FCA5A5)', boxShadow: '0 4px 16px rgba(248,113,113,0.35)' }}
          aria-label="Emergency help"
          title="Need help now?"
        >
          <AlertTriangle className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      </div>

      {/* Full-Screen Intervention Mode */}
      {interventionOpen && (
        <InterventionMode onClose={() => setInterventionOpen(false)} />
      )}
    </div>
  );
}
