import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileLayout } from "../layouts/MobileLayout";

import loadingLogo from "../assets/loading-logo.jpeg";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 1600);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout>
      <div className="flex min-h-screen items-center justify-center bg-white px-8">
        <motion.img
          src={loadingLogo}
          alt="Intern Alley"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="h-52 w-52 object-contain"
        />
      </div>
    </MobileLayout>
  );
}