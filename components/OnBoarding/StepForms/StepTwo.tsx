"use client";

import React, {
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useRef,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";
import { Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormDataInterface } from "@/types/userTypes";

type SteTwoFormData = {
    goal: string | null;
};

const step2Schema = yup.object({
    goal: yup.string().required("Goal is required"),
});

const StepTwo = forwardRef(
    (
        { nextStep, defaultValues, setFormData }: FormDataInterface,
        ref: ForwardedRef<{ triggerSubmit: () => void }>
    ) => {
        const formRef = useRef<HTMLFormElement | null>(null);

        const {
            register,
            handleSubmit,
            formState: { errors },
            control,
        } = useForm({
            resolver: yupResolver(step2Schema),
            defaultValues: {
                goal: defaultValues.goal || "",
            },
        });

        const onSubmit: SubmitHandler<SteTwoFormData> = (data) => {
            console.log("Form Submitted:", data);
            setFormData((prev: SteTwoFormData) => ({ ...prev, ...data }))
            nextStep();
        };

        useImperativeHandle(ref, () => ({
            triggerSubmit: () => {
                handleSubmit(onSubmit)();
            },
        }));

        return (
            <div className="space-y-6 animate-fade-in">
                <form ref={formRef}>
                    <div className="text-center mb-6">
                        <Target className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            Your Fitness Goal
                        </h2>
                        <p className="text-gray-300">What do you want to achieve?</p>
                    </div>

                    <Controller
                        control={control}
                        name="goal"
                        render={({ field }) => (
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="space-y-4"
                            >
                                {[
                                    { value: "lose-weight", label: "Lose Weight", icon: "🔥" },
                                    { value: "build-muscle", label: "Build Muscle", icon: "💪" },
                                    {
                                        value: "maintain-fitness",
                                        label: "Maintain Fitness",
                                        icon: "⚖️",
                                    },
                                    {
                                        value: "improve-endurance",
                                        label: "Improve Endurance",
                                        icon: "🏃‍♂️",
                                    },
                                    {
                                        value: "improve endurance",
                                        label: "Improve Endurance",
                                        icon: "🤖",
                                    },
                                ].map((goal) => (
                                    <div
                                        key={goal.value}
                                        className={`flex items-center space-x-3 p-4 rounded-lg transition-colors cursor-pointer ${field.value === goal.value
                                            ? "bg-purple-600/20 border-purple-500"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <RadioGroupItem value={goal.value} id={goal.value} />
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{goal.icon}</span>
                                            <Label
                                                htmlFor={goal.value}
                                                className="text-white cursor-pointer flex-1"
                                            >
                                                {goal.label}
                                            </Label>
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    />
                    {errors.goal && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.goal.message}
                        </p>
                    )}
                </form>
            </div>
        );
    }
);

StepTwo.displayName = "StepTwo";

export default StepTwo;
