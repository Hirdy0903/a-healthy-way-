import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/DashboardPage';
import KnowledgeBasePage from '@/pages/KnowledgeBasePage';
import ConditionDetailPage from '@/pages/ConditionDetailPage';
import LifestyleFactorsPage from '@/pages/LifestyleFactorsPage';
import FactorDetailPage from '@/pages/FactorDetailPage';
import AssessmentPage from '@/pages/AssessmentPage';
import ToolkitPage from '@/pages/ToolkitPage';
import JournalPage from '@/pages/JournalPage';
import MoodTrackerPage from '@/pages/MoodTrackerPage';
import ProblemHubPage from '@/pages/ProblemHubPage';
import ProblemDetailPage from '@/pages/ProblemDetailPage';
import EmergencyPage from '@/pages/EmergencyPage';
import ProgramsPage from '@/pages/ProgramsPage';
import ProgramDetailPage from '@/pages/ProgramDetailPage';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="conditions" element={<KnowledgeBasePage />} />
          <Route path="conditions/:id" element={<ConditionDetailPage />} />
          <Route path="lifestyle" element={<LifestyleFactorsPage />} />
          <Route path="lifestyle/:id" element={<FactorDetailPage />} />
          <Route path="assessments" element={<AssessmentPage />} />
          <Route path="toolkit" element={<ToolkitPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="mood" element={<MoodTrackerPage />} />
          <Route path="problems" element={<ProblemHubPage />} />
          <Route path="problems/:id" element={<ProblemDetailPage />} />
          <Route path="emergency" element={<EmergencyPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="programs/:id" element={<ProgramDetailPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
