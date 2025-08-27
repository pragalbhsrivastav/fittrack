export interface OnBoardingFormDataType {
  age: number | null;
  gender: string;
  currentWeight: number | null;
  height: number | null;
  goal: string;
  experienceLevel: string;
  workoutFrequency: string;
  targetWeight: number | null;
  activityLevel: string;
}

export interface UserProfile {
  name: string;
  onboarding: {
    isOnboarded: boolean;
    age: number;
    gender: string;
    experienceLevel: string;
    workoutDaysPerWeek: string;
    goal: string;
    targetWeight: number;
    currentWeight: number;
    activityLevel: string;
    height: number;
    bmi: {
      value: number,
      category: string
    }
  };
}

export interface FormDataInterface {
  defaultValues: OnBoardingFormDataType,
  nextStep: () => void | undefined
}