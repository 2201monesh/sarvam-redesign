"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isOnboardingComplete } from "@/modules/onboarding/helpers/useOnboardingStorage";
import OnboardingFlow from "@/modules/onboarding/onboarding-flow";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    if (isOnboardingComplete()) {
      router.replace("/home");
    }
  }, [router]);

  return <OnboardingFlow />;
}
