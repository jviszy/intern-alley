import { useRef, useState } from "react";
import { ArrowLeft, FileText, UploadCloud } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { MobileLayout } from "../layouts/MobileLayout";
import { apiFetch } from "../services/api";

export function ApplicationProcessPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const savedResume = JSON.parse(
    localStorage.getItem("intern_alley_resume") || "{}"
  );

  const resume = {
    fullName: savedResume.fullName || "Oluwatimilehin Alarape",
    email: savedResume.email || "alarapeti20@gmail.com",
    phone: savedResume.phone || "+234 810 000 0000",
    school: savedResume.school || "Lagos State",
    role: savedResume.role || "UI/UX Designer Intern",
    company: savedResume.company || "Hubs Ghana",
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedResumeName, setUploadedResumeName] = useState("");

  async function submitApplication() {
    try {
      setLoading(true);
      setMessage("");

      await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({
          jobId,
          coverLetter: uploadedResumeName
            ? `Uploaded resume: ${uploadedResumeName}`
            : "I am interested in this internship opportunity.",
        }),
      });

      setMessage("Application submitted successfully.");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleResumeUpload(file?: File) {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    setUploadedResumeName(file.name);
    setMessage("Resume uploaded successfully.");
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-white px-6 py-8">
        <button
          onClick={() => navigate(`/jobs/${jobId}`)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8FA] text-[#06345d]"
        >
          <ArrowLeft size={20} />
        </button>

        <section className="mt-10">
          <h1 className="text-3xl font-black text-[#1A1A1A]">
            Application Process
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please make sure to verify all details
          </p>
        </section>

        <section className="mt-6 rounded-3xl bg-[#EAF8FA] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0C9FB3]">
              <FileText size={22} />
            </div>

            <div>
              <h2 className="font-black text-[#06345d]">
                {resume.fullName}’s Resume
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Review your resume before applying
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-gray-600">
            <p>{resume.email}</p>
            <p>{resume.phone}</p>
            <p>{resume.school}</p>
            <p>
              {resume.role}, {resume.company}
            </p>
          </div>

          <button
            onClick={() => navigate(`/jobs/${jobId}/resume`)}
            className="mt-5 w-full rounded-full bg-[#0C9FB3] py-4 font-bold text-white"
          >
            Edit resume
          </button>
        </section>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(event) => handleResumeUpload(event.target.files?.[0])}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded-3xl border border-dashed border-gray-300 p-6 text-center transition active:scale-[0.98]"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF8FA] text-[#0C9FB3]">
            <UploadCloud size={22} />
          </div>

          <p className="mt-4 font-bold text-[#1A1A1A]">
            {uploadedResumeName || "Upload a new resume"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            PDF, DOC, or DOCX supported
          </p>
        </button>

        {message && (
          <div className="mt-6 rounded-2xl bg-[#EAF8FA] px-4 py-4 text-sm font-semibold text-[#06345d]">
            {message}
          </div>
        )}

        <button
          onClick={submitApplication}
          disabled={
            loading || message === "You have already applied to this job"
          }
          className="mt-10 w-full rounded-full bg-[#0C9FB3] py-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Submitting..."
            : message === "You have already applied to this job"
            ? "Already Applied"
            : "Apply for this internship"}
        </button>
      </div>
    </MobileLayout>
  );
}