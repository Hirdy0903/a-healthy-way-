import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import guidedPrograms from '@/data/guidedPrograms';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function ProgramsPage() {
  const [progress] = useLocalStorage('program_progress', {});

  const getProgramCompletion = (programId, totalDays) => {
    const prog = progress[programId];
    if (!prog) return 0;
    const completed = Object.values(prog.days || {}).filter((d) => d.completed).length;
    return Math.round((completed / totalDays) * 100);
  };

  return (
    <div className="space-y-6 animate-page-enter">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Guided Programs</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Structured multi-day plans to build better habits and reduce symptoms.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guidedPrograms.map((program) => {
          const completion = getProgramCompletion(program.id, program.days.length);
          return (
            <Link key={program.id} to={`/programs/${program.id}`} className="group p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
              <span className="text-3xl mb-3 block">{program.icon}</span>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 transition-colors">{program.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{program.subtitle}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-400"><Clock className="w-3 h-3" />{program.duration}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{program.description}</p>
              {completion > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>Progress</span><span>{completion}%</span></div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                    <div className="bg-teal-500 h-1.5 rounded-full transition-all" style={{ width: `${completion}%` }} />
                  </div>
                </div>
              )}
              <div className="mt-3 flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-medium">
                {completion > 0 ? 'Continue' : 'Start Program'} <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
