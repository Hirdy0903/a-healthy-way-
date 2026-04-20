import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import assessments from '@/data/assessments';
import useAssessmentResults from '@/hooks/useAssessmentResults';

export default function AssessmentPage() {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { addResult, getLatestResult } = useAssessmentResults();

  const handleAnswer = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, s) => sum + s, 0);
  };

  const getResultLevel = () => {
    const score = calculateScore();
    const range = selectedAssessment.scoring.ranges.find((r) => score >= r.min && score <= r.max);
    return range || selectedAssessment.scoring.ranges[selectedAssessment.scoring.ranges.length - 1];
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const result = getResultLevel();
    addResult({
      assessmentId: selectedAssessment.id,
      assessmentTitle: selectedAssessment.title,
      score,
      maxScore: selectedAssessment.questions.length * (selectedAssessment.questions[0].options.length - 1),
      level: result.level,
      label: result.label,
    });
    setShowResults(true);
  };

  const reset = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // Assessment selection screen
  if (!selectedAssessment) {
    return (
      <div className="space-y-6 animate-page-enter">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Self-Assessment</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Understand your mental health with these evidence-based screening tools.</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400">These are screening tools for educational purposes only. They are NOT clinical diagnoses. Results should not replace professional evaluation.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map((a) => {
            const latest = getLatestResult(a.id);
            return (
              <button key={a.id} onClick={() => setSelectedAssessment(a)} className="text-left p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
                <span className="text-3xl mb-3 block">{a.icon}</span>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{a.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{a.subtitle}</p>
                <p className="text-xs text-slate-400 mt-2">⏱ {a.duration} · {a.questions.length} questions</p>
                {latest && (
                  <div className={`mt-3 text-xs px-2 py-1 rounded-full inline-block ${latest.level === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : latest.level === 'moderate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    Last result: {latest.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const result = getResultLevel();
    const score = calculateScore();
    const maxScore = selectedAssessment.questions.length * (selectedAssessment.questions[0].options.length - 1);
    return (
      <div className="space-y-6 animate-page-enter max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{selectedAssessment.title} Results</h2>
          <p className="text-sm text-slate-500 mt-1">Completed just now</p>
        </div>
        <div className={`p-6 rounded-xl ${result.bgColor} border ${result.borderColor} text-center`}>
          <p className={`text-3xl font-bold ${result.color}`}>{result.label}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Score: {score}/{maxScore}</p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-4">
            <div className={`h-2 rounded-full transition-all ${result.level === 'low' ? 'bg-green-500' : result.level === 'moderate' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${(score / maxScore) * 100}%` }} />
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{result.description}</p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />{r}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">{selectedAssessment.disclaimer}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={reset} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Take Another
          </button>
          <Link to="/" className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors text-center">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Quiz screen
  const question = selectedAssessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedAssessment.questions.length) * 100;
  const canProceed = answers[question.id] !== undefined;

  return (
    <div className="space-y-6 animate-page-enter max-w-2xl mx-auto">
      <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600">
        <ArrowLeft className="w-4 h-4" /> Exit Assessment
      </button>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{selectedAssessment.title}</h2>
          <span className="text-xs text-slate-500">{currentQuestion + 1}/{selectedAssessment.questions.length}</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
          <div className="bg-teal-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <p className="text-base font-medium text-slate-800 dark:text-slate-100 mb-6">{question.text}</p>
        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(question.id, opt.score)}
              className={`w-full text-left p-4 rounded-xl border-2 text-sm transition-all ${
                answers[question.id] === opt.score
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {currentQuestion > 0 && (
          <button onClick={() => setCurrentQuestion((prev) => prev - 1)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button
          onClick={() => currentQuestion < selectedAssessment.questions.length - 1 ? setCurrentQuestion((prev) => prev + 1) : handleSubmit()}
          disabled={!canProceed}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition-colors ${canProceed ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500'}`}
        >
          {currentQuestion < selectedAssessment.questions.length - 1 ? <>Next <ArrowRight className="w-4 h-4" /></> : 'Show Results'}
        </button>
      </div>
    </div>
  );
}
