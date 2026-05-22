const DEMO_JOBS = [
  {
    id: "1",
    title: "Frontend Intern",
    description:
      "Work with React and TypeScript to build beautiful user interfaces.",
    location: "Abuja",
    jobType: "INTERNSHIP",
    workMode: "HYBRID",
    requiredSkills: ["React", "TypeScript", "CSS"],
    salaryMin: 80000,
    salaryMax: 150000,
    company: {
      name: "TechNova Labs",
      industry: "Technology",
      location: "Abuja",
    },
  },
  {
    id: "2",
    title: "UI/UX Design Intern",
    description:
      "Assist with wireframes, user research, and modern product design.",
    location: "Lagos",
    jobType: "INTERNSHIP",
    workMode: "REMOTE",
    requiredSkills: ["Figma", "UI Design", "Prototyping"],
    salaryMin: 70000,
    salaryMax: 120000,
    company: {
      name: "PixelForge Studio",
      industry: "Design",
      location: "Lagos",
    },
  },
  {
    id: "3",
    title: "Backend Developer Intern",
    description:
      "Build APIs using Node.js, PostgreSQL, and Prisma.",
    location: "Remote",
    jobType: "INTERNSHIP",
    workMode: "REMOTE",
    requiredSkills: ["Node.js", "PostgreSQL", "Prisma"],
    salaryMin: 90000,
    salaryMax: 160000,
    company: {
      name: "CloudStack Systems",
      industry: "Software",
      location: "Remote",
    },
  },
];

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("intern_alley_token");

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.warn("Backend unavailable. Using demo data.");

    if (path.includes("/jobs")) {
      return DEMO_JOBS;
    }

    if (path.includes("/auth/login")) {
      return {
        token: "demo-token",
        user: {
          id: "demo-user",
          fullName: "Demo User",
          email: "demo@internalley.com",
        },
      };
    }

    if (path.includes("/auth/register")) {
      return {
        success: true,
        message: "Demo account created successfully",
      };
    }

    return [];
  }
}