import { Briefcase, FileText, LogOut, Mail, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { BottomNav } from "../components/BottomNav";
import { MobileLayout } from "../layouts/MobileLayout";

export function ProfilePage() {
  const navigate = useNavigate();

  const resume = JSON.parse(
    localStorage.getItem("intern_alley_resume") || "{}"
  );

  function logout() {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#F6FBFC] pb-24">
        <header className="rounded-b-[2rem] bg-[#06345d] px-6 pb-10 pt-10 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF8FA] text-3xl font-black text-[#0C9FB3]">
              OA
            </div>

            <div>
              <h1 className="text-2xl font-black">
                {resume.fullName || "Oluwatimilehin Alarape"}
              </h1>

              <p className="mt-1 text-sm text-white/70">
                Intern Alley Candidate
              </p>
            </div>
          </div>
        </header>

        <main className="px-5 pt-6">
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-[#1A1A1A]">
              Profile Information
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={18} className="text-[#0C9FB3]" />
                {resume.email || "alarapeti20@gmail.com"}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={18} className="text-[#0C9FB3]" />
                {resume.school || "Lagos State"}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Briefcase size={18} className="text-[#0C9FB3]" />
                {resume.role || "UI/UX Designer Intern"}
              </div>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-[#0C9FB3]">1</p>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                Applications
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-[#0C9FB3]">1</p>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                Saved Jobs
              </p>
            </div>
          </section>

          <button
            onClick={() => navigate("/jobs/f2e4154f-721a-4db2-bc15-a3b8eb1d5fd4/resume")}
            className="mt-5 flex w-full items-center justify-between rounded-3xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-[#0C9FB3]" />

              <div className="text-left">
                <p className="font-black text-[#1A1A1A]">Edit Resume</p>
                <p className="mt-1 text-xs text-gray-500">
                  Update your candidate profile
                </p>
              </div>
            </div>

            <User size={18} className="text-gray-400" />
          </button>

          <button
            onClick={logout}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-red-50 py-5 font-bold text-red-500"
          >
            <LogOut size={20} />
            Logout
          </button>
        </main>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}