import {
  Bell,
  Bookmark,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BottomNav } from "../components/BottomNav";
import { MobileLayout } from "../layouts/MobileLayout";
import { apiFetch } from "../services/api";
import { getUser } from "../services/auth";

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

export function HomePage() {
  const navigate = useNavigate();
  const user = getUser();

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email || "Candidate";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    apiFetch("/jobs")
      .then(setJobs)
      .catch(console.error);

    const storedSavedJobs = JSON.parse(
      localStorage.getItem("intern_alley_saved_jobs") || "[]"
    );

    setSavedJobs(storedSavedJobs);
  }, []);

  function toggleSaveJob(jobId: string) {
    let updatedJobs: string[] = [];

    if (savedJobs.includes(jobId)) {
      updatedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      updatedJobs = [...savedJobs, jobId];
    }

    setSavedJobs(updatedJobs);

    localStorage.setItem(
      "intern_alley_saved_jobs",
      JSON.stringify(updatedJobs)
    );
  }

  const filteredJobs = jobs.filter((job) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      job.title.toLowerCase().includes(searchValue) ||
      job.description.toLowerCase().includes(searchValue) ||
      job.location.toLowerCase().includes(searchValue) ||
      job.company.name.toLowerCase().includes(searchValue) ||
      job.requiredSkills.some((skill) =>
        skill.toLowerCase().includes(searchValue)
      )
    );
  });

  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#F6FBFC] pb-24">
        <header className="rounded-b-[2rem] bg-[#06345d] px-5 pb-8 pt-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Welcome Back</p>

              <h1 className="text-lg font-black">
                {displayName} 👋
              </h1>
            </div>

            <button
              onClick={() => navigate("/notifications")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8FA] text-[#0C9FB3]"
            >
              <Bell size={20} />
            </button>
          </div>

          <div className="mt-7 flex items-center gap-3 rounded-full bg-white px-4 py-3 text-gray-500">
            <Search size={18} />

            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search internships"
              className="flex-1 bg-transparent text-sm outline-none"
            />

            <button className="flex items-center gap-1 rounded-full bg-[#EAF8FA] px-3 py-2 text-xs font-semibold text-[#06345d]">
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </div>
        </header>

        <main className="px-5 pt-6">
          <h2 className="text-xl font-black text-[#1A1A1A]">
            Internships for you
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Explore opportunities matched to your profile
          </p>

          <div className="relative z-10 mt-5 space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="mt-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF8FA] text-[#0C9FB3]">
                  <Search size={28} />
                </div>

                <h3 className="mt-5 text-xl font-black text-[#1A1A1A]">
                  No internships found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try searching with another keyword.
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isSaved = savedJobs.includes(job.id);

                return (
                  <article
                    key={job.id}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="relative z-20 cursor-pointer rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition active:scale-[0.98]"
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
                          toggleSaveJob(job.id);
                        }}
                        className={`transition ${
                          isSaved ? "text-[#0C9FB3]" : "text-gray-400"
                        }`}
                      >
                        <Bookmark
                          size={20}
                          fill={isSaved ? "#0C9FB3" : "transparent"}
                        />
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
                );
              })
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}