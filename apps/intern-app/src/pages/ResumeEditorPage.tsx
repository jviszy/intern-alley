import { useState } from "react";
import { ArrowLeft, Briefcase, GraduationCap, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { MobileLayout } from "../layouts/MobileLayout";

export function ResumeEditorPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const savedResume = JSON.parse(
    localStorage.getItem("intern_alley_resume") || "{}"
  );

  const [fullName, setFullName] = useState(
    savedResume.fullName || "Oluwatimilehin Alarape"
  );
  const [email, setEmail] = useState(
    savedResume.email || "alarapeti20@gmail.com"
  );
  const [phone, setPhone] = useState(savedResume.phone || "+234 810 000 0000");
  const [role, setRole] = useState(savedResume.role || "UI/UX Designer Intern");
  const [company, setCompany] = useState(savedResume.company || "Hubs Ghana");
  const [experience, setExperience] = useState(
    savedResume.experience ||
      "Worked on internship product design, research, and interface improvements."
  );
  const [school, setSchool] = useState(savedResume.school || "Lagos State");
  const [course, setCourse] = useState(
    savedResume.course || "Design / Technology"
  );

  function saveResume() {
    localStorage.setItem(
      "intern_alley_resume",
      JSON.stringify({
        fullName,
        email,
        phone,
        role,
        company,
        experience,
        school,
        course,
      })
    );

    navigate(`/jobs/${jobId}/apply`);
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-white px-6 py-8">
        <button
          onClick={() => navigate(`/jobs/${jobId}/apply`)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8FA] text-[#06345d]"
        >
          <ArrowLeft size={20} />
        </button>

        <section className="mt-10">
          <h1 className="text-3xl font-black text-[#1A1A1A]">Resume</h1>
          <p className="mt-2 text-sm text-gray-500">
            Update your resume details before applying
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="mb-4 flex items-center gap-3">
              <User className="text-[#0C9FB3]" size={20} />
              <h2 className="font-black text-[#06345d]">Personal</h2>
            </div>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#0C9FB3]"
              placeholder="Full name"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#0C9FB3]"
              placeholder="Email"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#0C9FB3]"
              placeholder="Phone"
            />
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="mb-4 flex items-center gap-3">
              <Briefcase className="text-[#0C9FB3]" size={20} />
              <h2 className="font-black text-[#06345d]">Experience</h2>
            </div>

            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#0C9FB3]"
              placeholder="Role"
            />

            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#0C9FB3]"
              placeholder="Company"
            />

            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="min-h-28 w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#0C9FB3]"
              placeholder="Describe your experience"
            />
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="text-[#0C9FB3]" size={20} />
              <h2 className="font-black text-[#06345d]">Education</h2>
            </div>

            <input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#0C9FB3]"
              placeholder="School"
            />

            <input
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#0C9FB3]"
              placeholder="Course"
            />
          </div>
        </section>

        <button
          onClick={saveResume}
          className="mt-8 w-full rounded-full bg-[#0C9FB3] py-5 font-bold text-white"
        >
          Save resume
        </button>
      </div>
    </MobileLayout>
  );
}