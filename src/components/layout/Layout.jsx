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
      <div className="p-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">MindWell</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Student Mental Health</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navSections.map((section) => (
          <div key={section.title} className="mb-2">
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider hover:text-slate-600 dark:hover:text-slate-300"
            >
              {section.title}
              {collapsedSections[section.title] ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {!collapsedSections[section.title] && (
              <div className="space-y-0.5 mt-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-teal-600 dark:text-teal-400' : ''}`} />
                      <span>{item.label}</span>
                      {item.path === '/emergency' && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
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
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Privacy First</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">All data stored locally on your device. Nothing is shared.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
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
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-30">
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl sticky top-0 z-20">
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3 items-end">
        <button
          onClick={() => setInterventionOpen(true)}
          className="px-5 py-3.5 rounded-full bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group border border-slate-700 dark:border-slate-200"
        >
          <Heart className="w-5 h-5 group-hover:animate-pulse text-rose-400 dark:text-rose-500" />
          <span className="text-sm font-medium pr-1">I'm not okay right now</span>
        </button>
        <button
          onClick={() => navigate('/emergency')}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center group"
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
