export interface OnboardingState {
  role:      string;
  useCase:   string;
  languages: string[];
}

export interface StepProps {
  state:    OnboardingState;
  onChange: (patch: Partial<OnboardingState>) => void;
  onNext:   () => void;
  onBack:   () => void;
  step:     number;
}
