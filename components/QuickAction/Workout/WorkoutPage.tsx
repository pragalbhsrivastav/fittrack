'use client';

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WorkoutForm from './WorkoutForm';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import WorkoutHistory from './WorkoutHistory';

const WorkoutPage = () => {

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative w-full h-full perspective">
            <motion.div
                className="relative w-full h-full z-30"
                animate={{
                    rotateY: isFlipped ? 180 : 0
                }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >

                {/* Front Side */}
                <div
                    className="absolute w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                >

                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                        <CardHeader>
                            <CardTitle className='flex justify-between p-0 m-0'>
                                <div>Workout History</div>
                                <div>
                                    <Button onClick={() => setIsFlipped(!isFlipped)}>Log Workout</Button>
                                </div>
                            </CardTitle>
                            <CardDescription>View your workout history</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[50vh] w-full pr-2">
                                <WorkoutHistory isFlipped={isFlipped}/>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                </div>

                {/* Back side */}
                <div

                    className="absolute w-full h-full"
                    style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                    }}

                >
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 transition-all duration-200 cursor-pointer text-white">
                        <CardHeader>
                            <CardTitle className='flex justify-between p-0 m-0'>
                                <div>Log Workout</div>
                                <div>
                                    <Button onClick={() => setIsFlipped(!isFlipped)}>History</Button>
                                </div>
                            </CardTitle>
                            <CardDescription>Log your daily workout</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <WorkoutForm />
                        </CardContent>
                    </Card>
                </div>




            </motion.div >

            <style jsx>{`
                .perspective {
                    perspective: 1200px;
                }
            `}
            </style>
        </div >

    )
}

export default WorkoutPage
