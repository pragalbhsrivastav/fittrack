'use client';

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  ForwardedRef,
} from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from 'lucide-react';
import { FormDataInterface, OnBoardingFormDataType } from '@/types/userTypes';

type StepOneFormData = {
  gender: string;
  age: number;
  currentWeight: number;
  height: number;
};

const step1Schema = yup.object({
  gender: yup.string().required('Gender is required'),
  age: yup
    .number()
    .required('Age is required')
    .min(14, 'Age must be greater than 0'),
  currentWeight: yup
    .number()
    .required('Current Weight is required')
    .min(25, 'Current weight must be greater than 0'),
  height: yup
    .number()
    .required('Height is required')
    .min(50, 'Height must be greater than 0'),
});


const StepOne = forwardRef(
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
      formState: { errors },
      control,
    } = useForm<StepOneFormData>({
      resolver: yupResolver(step1Schema),
      defaultValues: {
        gender: defaultValues.gender || '',
        age: defaultValues.age || 0,
        currentWeight: defaultValues.currentWeight || 0,
        height: defaultValues.height || 0,
      },
    });

    const onSubmit: SubmitHandler<StepOneFormData> = (data) => {
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
      <div className="space-y-6 animate-fade-in text-white">
        <form ref={formRef}>
          <div className="text-center mb-6">
            <User className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Personal Information
            </h2>
            <p className="text-gray-300">
              Tell us about yourself to personalize your experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-white">
                Gender
              </Label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select
                    required
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-75">
                      <SelectValue
                        className="text-white"
                        placeholder="Select your gender"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white w-75">
                      {[
                        { value: 'male', label: 'Male', icon: '👨' },
                        { value: 'female', label: 'Female', icon: '👩' },
                        { value: 'other', label: 'Other', icon: '🌈' },
                      ].map((gender) => (
                        <SelectItem
                          key={gender.value}
                          value={gender.value}
                          className="flex items-center gap-2 w-75"
                        >
                          <span>{gender.icon}</span>
                          <span>{gender.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-white">
                Age
              </Label>
              <Input
                required
                id="age"
                type="number"
                {...register('age', { valueAsNumber: true })}
                placeholder="Enter your age"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              {errors.age && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-white">
                Weight (kg)
              </Label>
              <Input
                required
                id="weight"
                type="number"
                {...register('currentWeight', { valueAsNumber: true })}
                placeholder="Enter your weight"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              {errors.currentWeight && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.currentWeight.message}
                </p>
              )}
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label htmlFor="height" className="text-white">
                Height (cm)
              </Label>
              <Input
                required
                id="height"
                type="number"
                {...register('height', { valueAsNumber: true })}
                placeholder="Enter your height"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              {errors.height && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.height.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
);

StepOne.displayName = 'StepOne';

export default StepOne;
