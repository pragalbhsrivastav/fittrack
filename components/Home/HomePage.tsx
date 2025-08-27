import React from 'react'
import gym2 from '@/public/gym3.jpg';
import Image from 'next/image';
import { Activity, ArrowRight, Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import Header from '../Header/Header';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import AnimatedCircles from '../AnimatedCircle';
import CommonBackground from '../CommonBackground';

const featuresSectionData = [
    {
        icon: <Target className="h-6 w-6 text-white" />,
        bg: "bg-purple-500",
        title: "Smart Goal Tracking",
        desc: "Set and achieve your fitness goals with AI-powered recommendations and progress tracking.",
    },
    {
        icon: <Activity className="h-6 w-6 text-white" />,
        bg: "bg-green-500",
        title: "Workout Analytics",
        desc: "Comprehensive analytics and insights to optimize your training and maximize results.",
    },
    {
        icon: <TrendingUp className="h-6 w-6 text-white" />,
        bg: "bg-blue-500",
        title: "Progress Visualization",
        desc: "Beautiful charts and progress photos to visualize your transformation journey.",
    },
]

const HomePage = () => {
    return (
        <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-700 to-black'>

            {/* <div className="absolute inset-0 opacity-10"> */}
            <AnimatedCircles />

            {/* Hero Background Image */}
            <div className="absolute inset-0 opacity-10">
                <CommonBackground bgImg={gym2} />
            </div>

            <div className="relative z-10">
                <Header />
                
                <div className="container mx-auto  py-20">
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-bold mb-6 text-white animate-fade-in">
                            Transform Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 block">
                                Fitness Journey
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 md:max-w-2xl mx-4 md:mx-auto animate-fade-in">
                            Track workouts, monitor nutrition, and achieve your fitness goals with AI-powered insights and personalized recommendations.
                        </p>
                        <div className="flex gap-4 justify-center animate-scale-in">
                            <Link href="/register">
                                <Button size="lg" className="bg-gradient-to-r from-gray-600 to-gray-600 hover:from-gray-700 hover:to-gray-700 text-white px-8 py-3 text-lg">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/subscription-plans" aria-disabled='true'>
                                <Button size="lg" variant="outline" className="border-white/30 text-black hover:bg-white/10 hover:text-white px-8 py-3 text-lg">
                                    View Plans
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className='py-4 md:py-20 px-4 md:px-12 grid space-x-3 space-y-4 grid-col-1 md:grid-cols-3'>
                        {featuresSectionData.map((card, index) => (
                            <Card key={index} className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 w-full md:w-100 h-fit">
                                <CardHeader>
                                    <div className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center mb-4`}>
                                        {card.icon}
                                    </div>
                                    <CardTitle className="text-white">{card.title}</CardTitle>
                                    <CardDescription className="text-gray-300">
                                        {card.desc}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    <div className='px-4 md:px-12 w-full'>
                        <div className="mt-16 text-center p-6 md:p-12 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 rounded border-1 w-full">
                            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                                <Sparkles className="h-10 w-10 text-yellow-400" />
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                Join thousands of users who have transformed their lives with FitTracker Pro. Start your free trial today!
                            </p>
                            <Link href="/onboarding">
                                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl">
                                    <Zap className="mr-2 h-6 w-6" />
                                    Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomePage
