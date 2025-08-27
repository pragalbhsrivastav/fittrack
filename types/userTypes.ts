export interface OnBoardingFormDataType {
  age: number;
  gender: string;
  currentWeight: number;
  height: number;
  goal: string;
  experienceLevel: string;
  workoutFrequency: string;
  targetWeight: number;
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
  nextStep: () => void | undefined,
  setFormData: React.Dispatch<React.SetStateAction<OnBoardingFormDataType>>;
}