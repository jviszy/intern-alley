import { Bell, Bookmark, Briefcase, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center gap-1 ${
            isActive("/home") ? "text-[#0C9FB3]" : "text-gray-400"
          }`}
        >
          <Briefcase size={20} />
          <span className="text-[10px] font-semibold">Internships</span>
        </button>

        <button
          onClick={() => navigate("/saved")}
          className={`flex flex-col items-center gap-1 ${
            isActive("/saved") ? "text-[#0C9FB3]" : "text-gray-400"
          }`}
        >
          <Bookmark size={20} />
          <span className="text-[10px] font-semibold">Saved</span>
        </button>

        <button
          onClick={() => navigate("/notifications")}
          className={`flex flex-col items-center gap-1 ${
            isActive("/notifications") ? "text-[#0C9FB3]" : "text-gray-400"
          }`}
        >
          <Bell size={20} />
          <span className="text-[10px] font-semibold">Messages</span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center gap-1 ${
            isActive("/profile") ? "text-[#0C9FB3]" : "text-gray-400"
          }`}
        >
          <User size={20} />
          <span className="text-[10px] font-semibold">Profile</span>
        </button>
      </div>
    </nav>
  );
}