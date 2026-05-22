import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "../layouts/MobileLayout";

import heroImage from "../assets/hero.png";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex min-h-screen flex-col bg-white">
        <div className="relative h-[48vh] overflow-hidden bg-[#061D33]">
          <img
            src={heroImage}
            alt="Intern Alley"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="px-8 text-center text-5xl font-black text-white">
              Intern Alley
            </h1>
          </div>
        </div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 -mt-12 flex flex-1 flex-col justify-between rounded-t-[3rem] bg-white px-8 pb-10 pt-10"
        >
          <div>
            <h2 className="text-center text-4xl font-black leading-tight text-[#1A1A1A]">
              Let’s upgrade your Future Experience
            </h2>

            <p className="mt-5 text-center text-base leading-7 text-[#7A7A7A]">
              Start your journey discovering internships, volunteer experiences,
              and pathways to becoming a global citizen.
            </p>
          </div>

          <div className="mt-10">
            <button
              onClick={() => navigate("/auth")}
              className="w-full rounded-full bg-[#0C9FB3] py-5 text-lg font-bold text-white shadow-lg"
            >
              Continue with mail
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white py-5 text-lg font-semibold text-[#1A1A1A] shadow-sm">
              <span className="text-2xl">G</span>
              Sign up with Google
            </button>
          </div>
        </motion.div>
      </div>
    </MobileLayout>
  );
}