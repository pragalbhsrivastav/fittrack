import AnimatedCircles from '@/components/AnimatedCircle'
import CommonBackground from '@/components/CommonBackground'
import React from 'react'
import gymnewBG from '@/public/gymnew3.jpg';
import Link from 'next/link';
import Actions from '@/components/QuickAction/Actions';
import { ArrowLeft } from 'lucide-react';


const page = () => {



    return (
        <div>
            <AnimatedCircles />

            <div className="absolute inset-0 opacity-20">
                <CommonBackground bgImg={gymnewBG} />
            </div>

            <div className="relative z-10 p-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors animate-fade-in">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>

                        <div className="text-center">
                            <h1 className="text-5xl font-bold mb-4 text-white animate-fade-in" style={{ textShadow: '4px 4px 4px black' }}>
                                Quick Actions Hub
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 animate-fade-in">
                                Log your workouts, meals, and track your daily progress with AI assistance
                            </p>
                        </div>
                    </div>

                    <div>
                        <Actions />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default page
