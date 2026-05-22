import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { getToken, logout } from "./auth";
import { LoginPage } from "./LoginPage";

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

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiFetch("/jobs").then(setJobs).catch(console.error);
  }, []);

  async function applyToJob(jobId: string) {
    try {
      setApplyingJobId(jobId);
      setMessage("");

      await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({
          jobId,
          coverLetter: "I am interested in this internship opportunity.",
        }),
      });

      setAppliedJobs((prev) => [...prev, jobId]);
      setMessage("Application submitted successfully.");
    } catch (error: any) {
      if (error.message.includes("already applied")) {
        setAppliedJobs((prev) => [...prev, jobId]);
        setMessage("You have already applied to this job.");
      } else {
        setMessage(error.message || "Something went wrong.");
      }
    } finally {
      setApplyingJobId(null);
    }
  }

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <header className="bg-[#082B49] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-2xl font-bold">Intern Alley</h1>

          <button
            onClick={() => {
              logout();
              setLoggedIn(false);
            }}
            className="rounded-xl bg-[#14B8A6] px-5 py-2 font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="font-semibold text-[#14B8A6]">Intern App</p>

          <h2 className="mt-3 text-4xl font-bold text-[#082B49]">
            Find internship opportunities that match your skills.
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Browse openings, apply to suitable roles, and track your applications from one clean dashboard.
          </p>
        </section>

        {message && (
          <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 px-5 py-4 text-sm font-medium text-[#082B49]">
            {message}
          </div>
        )}

        <section className="mt-8 grid gap-5">
          {jobs.map((job) => {
            const hasApplied = appliedJobs.includes(job.id);

            return (
              <div
                key={job.id}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#14B8A6]">
                      {job.company.name}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#082B49]">
                      {job.title}
                    </h3>
                  </div>

                  {hasApplied && (
                    <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-[#14B8A6]">
                      Already Applied
                    </span>
                  )}
                </div>

                <p className="mt-3 text-gray-600">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {job.location}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {job.jobType}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {job.workMode}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#082B49]/5 px-3 py-1 text-sm font-medium text-[#082B49]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  disabled={hasApplied || applyingJobId === job.id}
                  onClick={() => applyToJob(job.id)}
                  className="mt-5 rounded-xl bg-[#14B8A6] px-5 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {hasApplied
                    ? "Already Applied"
                    : applyingJobId === job.id
                      ? "Submitting..."
                      : "Apply Now"}
                </button>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;