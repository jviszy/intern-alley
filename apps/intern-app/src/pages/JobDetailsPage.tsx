import { ArrowLeft, Bookmark, Building2, MapPin, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  salaryMin?: number;
  salaryMax?: number;
  company: {
    name: string;
  };
};

export function JobDetailsPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [message, setMessage] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    apiFetch("/jobs")
      .then((jobs: Job[]) => {
        const foundJob = jobs.find((item) => item.id === jobId);
        setJob(foundJob || null);
      })
      .catch(console.error);
  }, [jobId]);

  async function applyToJob() {
    if (!job) return;

    try {
      setApplying(true);
      setMessage("");

      await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({
          jobId: job.id,
          coverLetter: "I am interested in this internship opportunity.",
        }),
      });

      setMessage("Application submitted successfully.");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setApplying(false);
    }
  }

  if (!job) {
    return (
      <MobileLayout>
        <div className="min-h-screen bg-[#F6FBFC] px-6 py-8">
          <button
            onClick={() => navigate("/home")}
            className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white"
          >
            <ArrowLeft size={20} />
          </button>

          <p className="text-gray-500">Loading internship...</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#F6FBFC] pb-28">
        <header className="bg-[#06345d] px-5 pb-8 pt-8 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/home")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
            >
              <ArrowLeft size={20} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <Bookmark size={20} />
            </button>
          </div>

          <div className="mt-8">
            <p className="text-sm text-white/70">{job.company.name}</p>
            <h1 className="mt-2 text-3xl font-black leading-tight">
              {job.title}
            </h1>
          </div>
        </header>

        <main className="-mt-5 rounded-t-[2rem] bg-[#F6FBFC] px-5 pt-6">
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Building2 className="text-[#0C9FB3]" size={20} />
                <span className="text-sm font-semibold text-gray-700">
                  {job.company.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-[#0C9FB3]" size={20} />
                <span className="text-sm font-semibold text-gray-700">
                  {job.location}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase className="text-[#0C9FB3]" size={20} />
                <span className="text-sm font-semibold text-gray-700">
                  {job.jobType} • {job.workMode}
                </span>
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#1A1A1A]">
              Internship Description
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {job.description}
            </p>
          </section>

          <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#1A1A1A]">
              Required Skills
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#EAF8FA] px-3 py-2 text-xs font-semibold text-[#06345d]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {message && (
            <div className="mt-5 rounded-2xl bg-[#EAF8FA] px-4 py-3 text-sm font-semibold text-[#06345d]">
              {message}
            </div>
          )}
        </main>

        <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <button
  onClick={() => navigate(`/jobs/${job.id}/apply`)}
  className="w-full rounded-full bg-[#0C9FB3] py-5 text-base font-bold text-white"
>
  Apply Now
</button>
        </div>
      </div>
    </MobileLayout>
  );
}