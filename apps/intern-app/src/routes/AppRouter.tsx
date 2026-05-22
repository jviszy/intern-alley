import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SplashPage } from "../pages/SplashPage";
import { WelcomePage } from "../pages/WelcomePage";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";
import { JobDetailsPage } from "../pages/JobDetailsPage";
import { ApplicationProcessPage } from "../pages/ApplicationProcessPage";
import { ResumeEditorPage } from "../pages/ResumeEditorPage";
import { SavedJobsPage } from "../pages/SavedJobsPage";
import { NotificationsPage } from "../pages/NotificationsPage";
import { ProfilePage } from "../pages/ProfilePage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/saved" element={<SavedJobsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/jobs/:jobId/apply" element={<ApplicationProcessPage />} />
        <Route path="/jobs/:jobId/resume" element={<ResumeEditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}