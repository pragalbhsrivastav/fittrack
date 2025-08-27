'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, Target, User } from 'lucide-react'
import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { FormDataInterface } from '@/types/userTypes';


type Step5FormData = {
    targetWeight: number;
};

const step5Schema = yup.object({
    targetWeight: yup.number()
        .required('Age is required')
        .min(30, 'Target Weight is required'),
});

const StepFive = forwardRef((
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
    } = useForm({
        resolver: yupResolver(step5Schema),
        defaultValues: {
            targetWeight: defaultValues.targetWeight || 0,
        },
    });


    const onSubmit: SubmitHandler<Step5FormData> = (data) => {
        console.log('Form Submitted:', data);
        setFormData((prev: Step5FormData) => ({ ...prev, ...data }))
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
                    <Target className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-2">Target Weight</h2>
                    <p className="text-gray-300">What&apos;s your target weight? (Optional)</p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="targetWeight" className="text-white">Target Weight (kg)</Label>
                        <Input
                            id="targetWeight"
                            type="number"
                            {...register("targetWeight", { valueAsNumber: true })}
                            placeholder="Enter your target weight (optional)"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                        {errors.targetWeight &&
                            <p className="text-sm text-red-500 mt-1">{errors.targetWeight.message}</p>
                        }
                    </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-white/20">
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        Ready to Start!
                    </h3>
                    <p className="text-gray-300 text-sm">
                        We&apos;ll use this information to create personalized workout plans, nutrition recommendations, and track your progress effectively.
                    </p>
                </div>
            </form>
        </div>
    )
});

StepFive.displayName = 'StepFive'

export default StepFive
