import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MobileLayout } from "../layouts/MobileLayout";
import { apiFetch } from "../services/api";
import { saveAuthSession } from "../services/auth";

export function AuthPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"login" | "register">("register");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setMessage("");

      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      saveAuthSession(response);

      navigate("/home");
    } catch (error: any) {
      setMessage(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    try {
      if (!firstName || !lastName || !email || !password) {
        setMessage("Please fill in all required fields.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      setLoading(true);
      setMessage("");

      const response = await apiFetch("/auth/register/intern", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      saveAuthSession({
        ...response,
        user: {
          ...response.user,
          firstName,
          lastName,
        },
      });

      navigate("/home");
    } catch (error: any) {
      setMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleAuth() {
    setMessage("Google sign-in is coming soon.");
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#06345d]">
        <div className="px-6 pb-10 pt-16 text-white">
          <h1 className="text-5xl font-black leading-tight">
            {activeTab === "login" ? "Welcome back" : "Getting started"}
          </h1>

          <p className="mt-3 text-base text-white/80">
            {activeTab === "login"
              ? "Login to continue your internship journey"
              : "Let’s help create your account here"}
          </p>
        </div>

        <div className="min-h-[75vh] rounded-t-[3rem] bg-white px-6 py-8">
          <div className="flex rounded-full bg-[#F3F4F6] p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setMessage("");
              }}
              className={`flex-1 rounded-full py-4 text-sm font-bold transition ${
                activeTab === "login"
                  ? "bg-white text-[#1A1A1A] shadow"
                  : "text-gray-500"
              }`}
            >
              Log In
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setMessage("");
              }}
              className={`flex-1 rounded-full py-4 text-sm font-bold transition ${
                activeTab === "register"
                  ? "bg-white text-[#1A1A1A] shadow"
                  : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          <div className="mt-8">
            {activeTab === "register" && (
              <>
                <label className="mb-2 block text-sm font-semibold text-[#1A1A1A]">
                  First Name
                </label>

                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  className="mb-5 w-full rounded-2xl border border-gray-200 px-5 py-5 text-sm outline-none focus:border-[#0C9FB3]"
                />

                <label className="mb-2 block text-sm font-semibold text-[#1A1A1A]">
                  Last Name
                </label>

                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  className="mb-5 w-full rounded-2xl border border-gray-200 px-5 py-5 text-sm outline-none focus:border-[#0C9FB3]"
                />
              </>
            )}

            <label className="mb-2 block text-sm font-semibold text-[#1A1A1A]">
              E-mail
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter e-mail"
              className="mb-5 w-full rounded-2xl border border-gray-200 px-5 py-5 text-sm outline-none focus:border-[#0C9FB3]"
            />

            <label className="mb-2 block text-sm font-semibold text-[#1A1A1A]">
              Password
            </label>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full rounded-2xl border border-gray-200 px-5 py-5 pr-14 text-sm outline-none focus:border-[#0C9FB3]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {activeTab === "register" && (
              <>
                <label className="mb-2 mt-5 block text-sm font-semibold text-[#1A1A1A]">
                  Confirm Password
                </label>

                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-5 text-sm outline-none focus:border-[#0C9FB3]"
                />
              </>
            )}

            {activeTab === "register" && (
              <p className="mt-6 text-sm leading-6 text-gray-500">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            )}

            {message && (
              <div className="mt-5 rounded-2xl bg-[#EAF8FA] px-4 py-4 text-sm font-semibold text-[#06345d]">
                {message}
              </div>
            )}

            <button
              type="button"
              onClick={activeTab === "login" ? handleLogin : handleRegister}
              disabled={loading}
              className="mt-8 w-full rounded-full bg-[#0C9FB3] py-5 text-lg font-bold text-white disabled:opacity-60"
            >
              {loading
                ? activeTab === "login"
                  ? "Logging in..."
                  : "Creating account..."
                : activeTab === "login"
                ? "Login"
                : "Next"}
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white py-5 text-lg font-semibold text-[#1A1A1A] shadow-sm"
            >
              <span className="text-2xl">G</span>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}