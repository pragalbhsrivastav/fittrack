'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Activity, ArrowLeft, GitGraph, PanelsTopLeft, PersonStanding, PilcrowRight, Target, TrendingUp, User } from 'lucide-react';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AxiosError } from 'axios';

interface ProfileFormData {
  name: string;
  email: string;
  gender: string;
  age: number;
  currentWeight: number;
  height: number;
  goal: string;
  experienceLevel: string;
  workoutFrequency: string;
  targetWeight: number;
  activityLevel: string;
}

const profileSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  gender: yup.string().required('Gender is required'),
  age: yup.number().required('Age is required').min(14, 'Age must be greater than 14years'),
  currentWeight: yup.number().required('Current weight is required').min(25, 'Current weight must be greater than 25kg'),
  targetWeight: yup.number().required('Target weight is required'),
  height: yup.number().required('Height is required').min(50, 'Height must be greater than 50cm'),
  goal: yup.string().required('Goal is required'),
  experienceLevel: yup.string().required('Experience level is required'),
  workoutFrequency: yup.string().required('Workout frequency is required'),
  activityLevel: yup.string().required('Activity level is required'),
});

const ProfileSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    control
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      gender: '',
      age: 0,
      currentWeight: 0,
      height: 0,
      goal: '',
      experienceLevel: '',
      workoutFrequency: '',
      targetWeight: 0,
      activityLevel: '',
    }
  });


  const currentWeight = watch('currentWeight');
  const targetWeight = watch('targetWeight');
  const height = watch('height');

  const [bmi, setBMI] = useState({ value: 0, category: '' })
  const [tdee, setTDEE] = useState()

  // ✅ Fetch and populate form data
  async function getProfile() {
    const res = await api.get("/profile");
    return res.data;
  }

  useEffect(() => {
    async function fetchProfileData() {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await getProfile();
      const data = result.data;
      console.log("result.data ==> ", result.data);
      setBMI(result?.data?.onboarding?.bmi)
      setTDEE(result?.data?.onboarding?.tdee)

      reset({
        name: data.name,
        email: data.email,
        age: data.onboarding.age,
        gender: data.onboarding.gender,
        experienceLevel: data.onboarding.experienceLevel,
        workoutFrequency: data.onboarding.workoutFrequency,
        goal: data.onboarding.goal,
        targetWeight: data.onboarding.targetWeight,
        currentWeight: data.onboarding.currentWeight,
        height: data.onboarding.height,
        activityLevel: data.onboarding.activityLevel,
      });
    }

    fetchProfileData();
  }, [reset]);


  const onSubmit = async (data: ProfileFormData) => {
    try {
      const res = await api.put('/user/userprofile', data);
      if (res.data?.message) {
        toast.success(res?.data?.message)
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string; error?: string }>;

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  };


  return (
    <div className="relative z-10 p-4 pb-14">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-white " style={{ textShadow: '4px 4px 4px black' }}>
              Your Fitness Profile
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          <div>
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">Profile Stats</CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  View your weight, height, BMI & more
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* BMI/Stats here */}
                <div className='text-center text-white backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl border rounded-2xl p-4'>
                  <div className='font-bold text-2xl'>Body Mass Index</div>
                  <div className='text-xl'>{bmi?.value ?? 'N/A'}</div>
                  <div className='text-sm'> {bmi?.category ?? 'N/A'} </div>
                </div>

                <div className='mt-4 text-center text-white backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl border rounded-2xl p-4'>
                  <div className='font-bold text-2xl'>Target Weight</div>
                  <div className='text-xl'>{targetWeight ?? 'N/A'} kg</div>
                </div>

                <div className='grid grid-cols-2 mt-4 space-x-3'>
                  <div className=' text-center text-white backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl border rounded-2xl p-4'>
                    <div className='font-bold text-center'>{currentWeight ?? 'N/A'} kg</div>
                    <div className='text-sm' >Current Weight</div>
                  </div><div className='text-center text-white  backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl border rounded-2xl p-4'>
                    <div className='font-bold'>{height ?? 'N/A'} cm</div>
                    <div className='text-sm'>height</div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white">Profile</CardTitle>
              <CardDescription className="text-gray-300 mt-[-5px]">
                Update your personal information, goals, and preferences
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name & Email */}
                <div className=' bg-white/10 border-white/20 shadow-2xl rounded-2xl border p-4'>
                  <div className='flex gap-4 mb-2 items-center mt-0'>
                    <User className='w-6 h-6  text-blue-400' />
                    <h1 className='text-xl text-blue-400 font-bold'>Personal Info</h1>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white">Name</Label>
                      <Input {...register('name')} className="mt-1 bg-white/10 text-white" />
                      {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label className="text-white">Email</Label>
                      <Input {...register('email')} readOnly className="mt-1 bg-white/10 text-white" />
                      {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Gender & Age */}
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <Label className="text-white mb-1">Gender</Label>
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => (
                          <Select
                            required
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="bg-white/10 text-white w-full">
                              <SelectValue
                                className="text-white"
                                placeholder="Select your gender"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-black  text-white w-80">
                              {[
                                { value: 'male', label: 'Male', icon: '👨' },
                                { value: 'female', label: 'Female', icon: '👩' },
                                { value: 'other', label: 'Other', icon: '🌈' },
                              ].map((gender) => (
                                <SelectItem
                                  key={gender.value}
                                  value={gender.value}
                                  className="flex items-center gap-2 w-80"
                                >
                                  <span>{gender.icon}</span>
                                  <span>{gender.label}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {/* <Input {...register('gender')} className="mt-1 bg-white/10 text-white" /> */}
                      {errors.gender && <p className="text-red-400 text-sm">{errors.gender.message}</p>}
                    </div>
                    <div>
                      <Label className="text-white">Age</Label>
                      <Input type="number" {...register('age')} className="mt-1 bg-white/10 text-white" />
                      {errors.age && <p className="text-red-400 text-sm">{errors.age.message}</p>}
                    </div>
                  </div>

                </div>

                {/* Weight & Target Weight */}
                <div className=' bg-white/10 border-white/20 shadow-2xl rounded-2xl border p-4 mt-4'>
                  <div className='flex gap-4 mt-0 mb-2 items-center'>
                    <Target className='w-6 h-6 text-green-400' />
                    <h1 className='text-xl text-green-400 font-bold'>Physical Stats</h1>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">


                    <div>
                      <Label className="text-white">Current Weight (kg)</Label>
                      <Input type="number" {...register('currentWeight')} className="mt-1 bg-white/10 text-white" />
                      {errors.currentWeight && <p className="text-red-400 text-sm">{errors.currentWeight.message}</p>}
                    </div>
                    <div>
                      <Label className="text-white">Target Weight (kg)</Label>
                      <Input type="number" {...register('targetWeight')} className="mt-1 bg-white/10 text-white" />
                      {errors.targetWeight && <p className="text-red-400 text-sm">{errors.targetWeight.message}</p>}
                    </div>

                    <div>
                      <Label className="text-white">Height (cm)</Label>
                      <Input type="number" {...register('height')} className="mt-1 bg-white/10 text-white" />
                      {errors.height && <p className="text-red-400 text-sm">{errors.height.message}</p>}
                    </div>
                  </div>
                </div>

                <div className=' bg-white/10 border-white/20 shadow-2xl rounded-2xl border p-4 mt-4'>

                  <div className='flex gap-4 mt-0 mb-2 items-center'>
                    <Target className='w-6 h-6  text-orange-400' />
                    <h1 className='text-xl text-orange-400 font-bold'>Fitness Goal</h1>
                  </div>

                  {/* Height & Activity Level */}
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <Label className="text-white mb-1">Goal</Label>
                      <Controller
                        control={control}
                        name="goal"
                        render={({ field }) => (
                          <Select
                            required
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white w-full">
                              <SelectValue
                                className="text-white"
                                placeholder="Select your goal"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-black  text-white w-80">
                              {[
                                { value: "lose weight", label: "Lose Weight", icon: "🔥" },
                                { value: "build muscle", label: "Build Muscle", icon: "💪" },
                                {
                                  value: "maintain fitness",
                                  label: "Maintain Fitness",
                                  icon: "⚖️",
                                },
                                {
                                  value: "improve endurance",
                                  label: "Improve Endurance",
                                  icon: "🏃‍♂️",
                                },
                                {
                                  value: "increase strength",
                                  label: "Increase Strength",
                                  icon: "🤖",
                                },
                              ].map((gender) => (
                                <SelectItem
                                  key={gender.value}
                                  value={gender.value}
                                  className="flex items-center gap-2 w-80"
                                >
                                  <span>{gender.icon}</span>
                                  <span>{gender.label}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {/* <Input {...register('goal')} className="mt-1 bg-white/10 text-white" /> */}
                      {errors.goal && <p className="text-red-400 text-sm">{errors.goal.message}</p>}
                    </div>

                    <div>
                      <Label className="text-white">Activity Level</Label>
                      <Input {...register('activityLevel')} className="mt-1 bg-white/10 text-white" />
                      {errors.activityLevel && <p className="text-red-400 text-sm">{errors.activityLevel.message}</p>}
                    </div>
                  </div>

                  {/* Goal & Experience Level */}
                  <div className="grid grid-cols-2 gap-6  mt-4">
                    <div>
                      <Label className="text-white mb-1">Experience Level</Label>
                      <Controller
                        control={control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <Select
                            required
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white w-full">
                              <SelectValue
                                className="text-white"
                                placeholder="Select your goal"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-black  text-white w-80">
                              {[
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
                              ].map((gender) => (
                                <SelectItem
                                  key={gender.value}
                                  value={gender.value}
                                  className="flex items-center gap-2 w-80"
                                >
                                  <span>{gender.icon}</span>
                                  <span>{gender.label}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.experienceLevel && <p className="text-red-400 text-sm">{errors.experienceLevel.message}</p>}
                    </div>

                    <div >
                      <Label className="text-white mb-1">Workout Frequency (per week)</Label>
                      <Controller
                        control={control}
                        name="workoutFrequency"
                        render={({ field }) => (
                          <Select
                            required
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white w-full">
                              <SelectValue
                                className="text-white"
                                placeholder="Select your goal"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-black  text-white w-80">
                              {[
                                { value: "2-3", label: "2-3 times per week", icon: "🗓️" },
                                { value: "4-5", label: "4-5 times per week", icon: "📅" },
                                { value: "6-7", label: "6-7 times per week", icon: "🔥" }
                              ].map((gender) => (
                                <SelectItem
                                  key={gender.value}
                                  value={gender.value}
                                  className="flex items-center gap-2 w-80"
                                >
                                  <span>{gender.icon}</span>
                                  <span>{gender.label}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.workoutFrequency && <p className="text-red-400 text-sm">{errors.workoutFrequency.message}</p>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 w-full"
                >
                  Update Profile
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
