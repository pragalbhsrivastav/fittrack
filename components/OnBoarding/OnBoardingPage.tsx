'use client';

import AnimatedCircles from '@/components/AnimatedCircle'
import CommonBackground from '@/components/CommonBackground'
import { ArrowLeft, ArrowRight, CheckCircle, Target } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import gym2 from '@/public/gym4.jpg';
import ProgrssTracker from './ProgrssTracker';
import { Button } from '@/components/ui/button';
import StepOne from './StepForms/StepOne';
import { OnBoardingFormDataType } from '@/types/userTypes';
import StepTwo from './StepForms/StepTwo';
import StepThree from './StepForms/StepThree';
import StepFour from './StepForms/StepFour';
import StepFive from './StepForms/StepFive';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/UserContext';
import { AxiosError } from 'axios';


const OnBoardingPage = () => {


    const { user } = useUser();


    const router = useRouter();
    // child Form Ref
    const childRef = useRef<{ triggerSubmit: () => void }>(null);

    const [formData, setFormData] = useState<OnBoardingFormDataType>({
        age: 0,
        gender: "",
        currentWeight: 0,
        height: 0,
        goal: "",
        experienceLevel: "",
        workoutFrequency: "",
        targetWeight: 0,
        activityLevel: "",
    })
    console.log("formData ==> ", formData);

    const [step, setStep] = useState(1);
    // const [progress, setProgress] = useState(0);
    const [totalSteps] = useState(5);
    const [isLoading, setIsLoading] = useState(false)

    const progress = (step / totalSteps) * 100;

    useEffect(() => {
        console.log("user ==> ", user);
    }, [user])

    const handlePrev = () => {
        if (step < 1) {
            return
        }
        setStep(prev => prev - 1)
    }

    // const handleNext = () => {
    //     if (step > 4) {
    //         return
    //     }
    //     setStep(prev => prev + 1)
    // }

    const handleNext = () => {
        if (childRef.current) {
            childRef.current.triggerSubmit(); // call child form submit method
        } else {
            if (step >= 5) return
            setStep(prev => prev + 1); // for other steps
        }
    };

    const handleFinish = async () => {
        if (childRef.current) {
            childRef.current.triggerSubmit(); // call child form submit method
        }

        setIsLoading(true);
        try {
            await api.put('/user/onboarding',
                formData
            );

            toast.success('Onboarded Successfull 😁')
            router.push('/dashboard')
        } catch (error) {
            const err = error as AxiosError<{ message?: string; error?: string }>;

            const errorMessage =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                "Something went wrong";

            toast.error(errorMessage);
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        if (user?.onboarding?.isOnboarded) {
            router.push('/dashboard')
        }
    }, [router, user])

    return (
        <div>
            <AnimatedCircles />

            <div className="absolute inset-0 opacity-20">
                <CommonBackground bgImg={gym2} />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">

                {/* <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link> */}

                <Card className="w-full max-w-2xl backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl my-10">
                    <CardHeader className="text-center">
                        <CardTitle>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Target className="h-8 w-8 text-purple-400" />
                                <CardTitle className="text-3xl font-bold text-white">Let`s Set Up Your Profile</CardTitle>
                            </div>
                            <ProgrssTracker progress={progress} totalSteps={totalSteps} step={step} />
                            {/* <Progress value={progress} className="w-full h-3" />
                                <p className='mt-4 text-gray-300'> Step {step} of {totalSteps} </p> */}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {step === 1 && (
                            <StepOne
                                ref={childRef}
                                nextStep={() => setStep(prev => prev + 1)}
                                defaultValues={formData}
                                setFormData={setFormData}
                            />
                        )}
                        {step === 2 && <StepTwo ref={childRef} nextStep={() => setStep(prev => prev + 1)} defaultValues={formData} setFormData={setFormData} />}
                        {step === 3 && <StepThree ref={childRef} nextStep={() => setStep(prev => prev + 1)} defaultValues={formData} setFormData={setFormData} />}
                        {step === 4 && <StepFour ref={childRef} nextStep={() => setStep(prev => prev + 1)} defaultValues={formData} setFormData={setFormData} />}
                        {step === 5 && <StepFive ref={childRef} nextStep={() => setStep(prev => prev + 1)} defaultValues={formData} setFormData={setFormData} />}

                    </CardContent>

                    <CardFooter className="flex-row justify-between gap-2 mt-4">

                        <Button
                            onClick={handlePrev}
                            disabled={step === 1}
                            variant="outline"
                            className="border-white/30 text-black hover:text-white hover:bg-white/10 disabled:opacity-50"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                        </Button>

                        {step < totalSteps ? (
                            <Button
                                type='submit'
                                onClick={handleNext}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleFinish}
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                            >
                                Complete Setup
                                <CheckCircle className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}

export default OnBoardingPage
