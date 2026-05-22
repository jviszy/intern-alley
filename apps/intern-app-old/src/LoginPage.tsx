import { useState } from "react";
import { apiFetch } from "./api";
import { saveToken } from "./auth";

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("testintern@example.com");
  const [password, setPassword] = useState("password123");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const data = await apiFetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    saveToken(data.accessToken);
    onLogin();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#082B49]">Intern Alley</h1>
        <p className="mt-2 text-gray-500">Login to continue</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <input
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#14B8A6]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#14B8A6]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          <button className="w-full rounded-xl bg-[#14B8A6] px-5 py-3 font-semibold text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}