import { ArrowLeft, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BottomNav } from "../components/BottomNav";
import { MobileLayout } from "../layouts/MobileLayout";
import { apiFetch } from "../services/api";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  workMode: string;
  requiredSkills: string[];
  company: {
    name: string;
  };
};

export function SavedJobsPage() {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function loadSavedJobs() {
      const savedIds = JSON.parse(
        localStorage.getItem("intern_alley_saved_jobs") || "[]"
      );

      const jobs: Job[] = await apiFetch("/jobs");

      setSavedJobs(jobs.filter((job) => savedIds.includes(job.id)));
    }

    loadSavedJobs().catch(console.error);
  }, []);

  function removeSavedJob(jobId: string) {
    const savedIds = JSON.parse(
      localStorage.getItem("intern_alley_saved_jobs") || "[]"
    );

    const updatedIds = savedIds.filter((id: string) => id !== jobId);

    localStorage.setItem(
      "intern_alley_saved_jobs",
      JSON.stringify(updatedIds)
    );

    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#F6FBFC] pb-24">
        <header className="rounded-b-[2rem] bg-[#06345d] px-6 pb-10 pt-8 text-white">
          <button
            onClick={() => navigate("/home")}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="mt-8">
            <h1 className="text-4xl font-black tracking-tight">
              Saved Jobs
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/70">
              Internships you bookmarked for later
            </p>
          </div>
        </header>

        <main className="px-5 pt-6">
          {savedJobs.length === 0 ? (
            <div className="mt-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF8FA] text-[#0C9FB3]">
                <Bookmark size={28} />
              </div>

              <h2 className="mt-5 text-xl font-black text-[#1A1A1A]">
                No saved jobs yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Bookmark internships you want to revisit later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <article
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-500">
                        {job.company.name}
                      </p>

                      <h3 className="mt-1 text-base font-black text-[#1A1A1A]">
                        {job.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                        {job.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeSavedJob(job.id);
                      }}
                      className="text-[#0C9FB3]"
                    >
                      <Bookmark size={20} fill="#0C9FB3" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#EAF8FA] px-3 py-1 text-xs text-[#06345d]">
                      {job.jobType}
                    </span>

                    <span className="rounded-full bg-[#EAF8FA] px-3 py-1 text-xs text-[#06345d]">
                      {job.workMode}
                    </span>

                    <span className="rounded-full bg-[#EAF8FA] px-3 py-1 text-xs text-[#06345d]">
                      {job.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}