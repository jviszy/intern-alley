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

  useEffect(() => {
    apiFetch("/jobs").then(setJobs).catch(console.error);
  }, []);

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
        </section>

        <section className="mt-8 grid gap-5">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-[#14B8A6]">
                {job.company.name}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#082B49]">
                {job.title}
              </h3>

              <p className="mt-2 text-gray-600">{job.description}</p>

              <p className="mt-3 text-sm text-gray-500">
                {job.location} • {job.jobType} • {job.workMode}
              </p>

              <button
                onClick={async () => {
                  try {
                    await apiFetch("/applications", {
                      method: "POST",
                      body: JSON.stringify({
                        jobId: job.id,
                        coverLetter:
                          "I am interested in this internship opportunity.",
                      }),
                    });

                    alert("Application submitted successfully");
                  } catch (error: any) {
                    alert(error.message);
                  }
                }}
                className="mt-5 rounded-xl bg-[#14B8A6] px-5 py-2 font-semibold text-white"
              >
                Apply Now
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;