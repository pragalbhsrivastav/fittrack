import { z } from "zod";

export const userSchema = z.object({
  age: z
    .number()
    .min(18, "Must be at least 18")
    .refine((val) => val !== undefined && val !== null, {
      message: "Age is required",
    }),

  gender: z
    .string()
    .min(1, "Gender is required"),

  currentWeight: z
    .number()
    .min(18, "Must be at least 18kg")
    .refine((val) => val !== undefined && val !== null, {
      message: "Current weight is required",
    }),

  height: z
    .number()
    .min(50, "Height must be at least 50cm")
    .refine((val) => val !== undefined && val !== null, {
      message: "Height is required",
    }),

  goal: z
    .string()
    .min(1, "Goal is required"),

  experienceLevel: z
    .string()
    .min(1, "Experience level is required"),

  workoutFrequency: z
    .string()
    .min(1, "Workout frequency is required"),

  targetWeight: z
    .number()
    .min(18, "Target weight must be at least 18kg")
    .refine((val) => val !== undefined && val !== null, {
      message: "Target weight is required",
    }),

});

export type SignUpFormData = z.infer<typeof userSchema>;
