"use client";

import { useState, useEffect } from "react";
import { getUserName } from "@/modules/onboarding/helpers/useOnboardingStorage";

export default function HomeHeader() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(getUserName());
  }, []);

  return (
    <div className="sticky top-0 z-10 w-full h-20 border-b border-neutral-200 flex items-center px-6 bg-white">
      <p className="text-xl font-season-mix">Welcome{name ? `, ${name}` : ""}</p>
    </div>
  );
}
