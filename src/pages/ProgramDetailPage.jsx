import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Calendar } from 'lucide-react';
import guidedPrograms from '@/data/guidedPrograms';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function ProgramDetailPage() {
  const { id } = useParams();
  const program = guidedPrograms.find((p) => p.id === id);
  const [progress, setProgress] = useLocalStorage('program_progress', {});

  if (!program) {
    return <div className="text-center py-20"><p className="text-slate-500">Program not found.</p><Link to="/programs" className="text-teal-600 text-sm mt-2 inline-block">← Back</Link></div>;
  }

  const programProgress = progress[program.id] || { days: {} };

  const toggleDay = (dayIndex) => {
    const current = programProgress.days[dayIndex]?.completed || false;
    setProgress((prev) => ({
      ...prev,
      [program.id]: {
        ...programProgress,
        startedAt: programProgress.startedAt || new Date().toISOString(),
        days: { ...programProgress.days, [dayIndex]: { completed: !current, completedAt: !current ? new Date().toISOString() : null } },
      },
    }));
  };

  const completedDays = Object.values(programProgress.days || {}).filter((d) => d.completed).length;

  return (
    <div className="space-y-6 animate-page-enter max-w-3xl">
      <Link to="/programs" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600"><ArrowLeft className="w-4 h-4" /> Back to Programs</Link>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{program.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{program.title}</h1>
            <p className="text-sm text-slate-500">{program.duration} · {completedDays}/{program.days.length} days completed</p>
          </div>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
          <div className="bg-teal-500 h-2 rounded-full transition-all" style={{ width: `${(completedDays / program.days.length) * 100}%` }} />
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">{program.description}</p>

      <div className="space-y-4">
        {program.days.map((day, i) => {
          const isCompleted = programProgress.days[i]?.completed;
          return (
            <div key={i} className={`p-5 rounded-xl border transition-colors ${isCompleted ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleDay(i)} className="flex-shrink-0">
                    {isCompleted ? <CheckCircle className="w-6 h-6 text-teal-500" /> : <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600" />}
                  </button>
                  <div>
                    <h3 className={`font-semibold ${isCompleted ? 'text-teal-700 dark:text-teal-300' : 'text-slate-800 dark:text-slate-100'}`}>Day {day.day}: {day.title}</h3>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 ml-9">
                {day.tasks.map((task, j) => (
                  <li key={j} className={`flex items-start gap-2 text-sm ${isCompleted ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {completedDays === program.days.length && (
        <div className="p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
          <p className="text-2xl mb-2">🎉</p>
          <p className="font-semibold text-green-800 dark:text-green-300">Congratulations!</p>
          <p className="text-sm text-green-700 dark:text-green-400 mt-1">You've completed the {program.title} program.</p>
        </div>
      )}
    </div>
  );
}
