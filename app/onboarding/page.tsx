"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isOnboardingComplete } from "@/modules/onboarding/hooks/useOnboardingStorage";
import OnboardingFlow from "@/modules/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    if (isOnboardingComplete()) {
      router.replace("/home");
    }
  }, [router]);

  return <OnboardingFlow />;
}
