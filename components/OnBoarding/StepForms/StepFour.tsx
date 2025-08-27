'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, User } from 'lucide-react'
import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormDataInterface, OnBoardingFormDataType } from '@/types/userTypes';

type Step4FormData = {
    workoutFrequency: string;
};

const step4Schema = yup.object({
    workoutFrequency: yup.string().required('workoutFrequency is required'),
});

const StepFour = forwardRef(
    (
        {
            nextStep,
            defaultValues,
            setFormData
        }: FormDataInterface,
        ref: ForwardedRef<{ triggerSubmit: () => void }>
    ) => {

        const formRef = useRef<HTMLFormElement | null>(null);

        const {
            register,
            handleSubmit,
            formState: { errors, },
            control
        } = useForm({
            resolver: yupResolver(step4Schema),
            defaultValues: {
                workoutFrequency: defaultValues.workoutFrequency,

            },
        });

        const onSubmit: SubmitHandler<Step4FormData> = (data) => {
            console.log('Form Submitted:', data);
            setFormData((prev : OnBoardingFormDataType)=> ({...prev, ...data}))
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
                        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-white mb-2">Workout Frequency</h2>
                        <p className="text-gray-300">How often do you plan to work out?</p>
                    </div>

                    <Controller
                        name="workoutFrequency"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="space-y-4"
                            >
                                {[
                                    { value: "2-3", label: "2-3 times per week", icon: "🗓️" },
                                    { value: "4-5", label: "4-5 times per week", icon: "📅" },
                                    { value: "6-7", label: "6-7 times per week", icon: "🔥" }
                                ].map((freq) => (
                                    <div
                                        key={freq.value}
                                        className={`flex items-center space-x-3 p-4 rounded-lg transition-colors cursor-pointer ${field.value === freq.value
                                            ? "bg-purple-600/20 border-purple-500"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <RadioGroupItem value={freq.value} id={freq.value} />
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{freq.icon}</span>
                                            <Label htmlFor={freq.value} className="text-white cursor-pointer">
                                                {freq.label}
                                            </Label>
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    />

                    {errors.workoutFrequency &&
                        <p className="text-sm text-red-500 mt-1">{errors.workoutFrequency.message}</p>
                    }

                    <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-white/20">
                        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            Almost Ready!
                        </h3>
                        <p className="text-gray-300 text-sm">
                            We`ll use this information to create personalized workout plans and track your progress effectively.
                        </p>
                    </div>
                </form>
            </div>
        )
    }
)

StepFour.displayName = "StepFour"

export default StepFour
