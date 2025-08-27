'use client';

import AnimatedCircles from '@/components/AnimatedCircle';
import CommonBackground from '@/components/CommonBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import gym2 from '@/public/gym4.jpg';

import { useForm } from 'react-hook-form';
import { signInSchema, SignInSchemaType } from '@/validators/authSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/UserContext';

const SignInPage = () => {

    const { user } = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInSchemaType>({
        resolver: yupResolver(signInSchema),
    });

    const router = useRouter();

    console.log("errors ==> ", errors);
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (user) {
            console.log("user?.data ==> ", user?.data);
            router.push('/onboarding')
        }
    }, [router, user])

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        try {
            const res = await api.post('/auth/login',
                data,
            );

            toast.success('Sign in successfully 😁')
            localStorage.setItem('token', res.data.token)
            // Redirect on success
            setTimeout(() => {
                router.push('/onboarding')
            }, 1000)
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div>
            <AnimatedCircles />

            <div className="absolute inset-0 opacity-20">
                <CommonBackground bgImg={gym2} />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>

                    <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl animate-scale-in">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
                            <CardDescription className="text-gray-300">
                                Sign in to continue your fitness journey
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            {...register('email')}
                                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-white">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            {...register('password')}
                                            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                            required
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-white"
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing In...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-300">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default SignInPage
