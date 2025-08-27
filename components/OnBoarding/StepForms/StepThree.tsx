'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Label } from '@/components/ui/label'
import { Activity } from 'lucide-react'
import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormDataInterface } from '@/types/userTypes';

const options = [
    {
        value: "beginner",
        label: "Beginner",
        desc: "New to fitness or returning after a long break",
        icon: "🌱",
    },
    {
        value: "intermediate",
        label: "Intermediate",
        desc: "Regular exercise routine for 6+ months",
        icon: "🏃‍♂️",
    },
    {
        value: "advanced",
        label: "Advanced",
        desc: "Consistent training for 2+ years",
        icon: "🏆",
    },
];

type StepThreeFormData = {
    experienceLevel: string
};


const step3Schema = yup.object({
    experienceLevel: yup.string().required('ExperienceLevel is required'),
});


const StepThree = forwardRef(
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
            resolver: yupResolver(step3Schema),
            defaultValues: {
                experienceLevel: defaultValues.experienceLevel || "",
            },
        });

        const onSubmit: SubmitHandler<StepThreeFormData> = (data) => {
            console.log("Form Submitted:", data);
            setFormData((prev: StepThreeFormData) => ({ ...prev, ...data }))
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
                        <Activity className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-white mb-2">Experience Level</h2>
                        <p className="text-gray-300">How would you describe your fitness experience?</p>
                    </div>

                    <Controller
                        control={control}
                        name="experienceLevel"
                        render={({ field }) => (
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="space-y-4"
                            >
                                {options.map((level) => (
                                    <div
                                        key={level.value}
                                        className={`flex items-center space-x-3 p-4 rounded-lg transition-colors cursor-pointer ${field.value === level.value
                                            ? "bg-purple-600/20 border-purple-500"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <RadioGroupItem value={level.value} id={level.value} />
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl">{level.icon}</span>
                                            <div>
                                                <Label
                                                    htmlFor={level.value}
                                                    className="text-white cursor-pointer font-semibold"
                                                >
                                                    {level.label}
                                                </Label>
                                                <p className="text-gray-400 text-sm">{level.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                        )} />

                    {errors.experienceLevel && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.experienceLevel.message}
                        </p>
                    )}
                </form>
            </div>
        );
    }
);

StepThree.displayName = 'StepThree';


export default StepThree;
