import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { BottomNav } from "../components/BottomNav";
import { MobileLayout } from "../layouts/MobileLayout";

const notifications = [
  {
    id: 1,
    title: "Application Submitted",
    message:
      "Your application for Frontend Intern at TechNova Labs was submitted successfully.",
    time: "2 mins ago",
  },
  {
    id: 2,
    title: "Application Viewed",
    message:
      "TechNova Labs reviewed your internship application.",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "New Internship Posted",
    message:
      "A new UI/UX Internship matching your profile was posted.",
    time: "Today",
  },
];

export function NotificationsPage() {
  const navigate = useNavigate();

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
              Notifications
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/70">
              Stay updated with your internship activities
            </p>
          </div>
        </header>

        <main className="space-y-4 px-5 pt-6">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className="rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF8FA] text-[#0C9FB3]">
                  <Bell size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-black text-[#1A1A1A]">
                      {notification.title}
                    </h2>

                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {notification.message}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}