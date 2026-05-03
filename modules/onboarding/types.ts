export interface OnboardingState {
  name:              string;
  heardFrom:         string;
  preferredLanguage: string;
  role:              string;
  useCase:           string;
  languages:         string[];
}

export interface StepProps {
  state:    OnboardingState;
  onChange: (patch: Partial<OnboardingState>) => void;
  onNext:   () => void;
  onBack:   () => void;
  step:     number;
}
