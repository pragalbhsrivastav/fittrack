
'use client';

import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import MealHistory from './MealHistory';
import MealLog from './MealLog';

const MealPage = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
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
                            <div>Meal History</div>
                            <div>
                                <Button onClick={() => setIsFlipped(!isFlipped)}>Log Meal</Button>
                            </div>
                        </CardTitle>
                        <CardDescription>View you meal history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MealLog />
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
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                    <CardHeader>
                        <CardTitle className='flex justify-between p-0 m-0'>
                            <div>Log Your Meal</div>
                            <div>
                                <Button onClick={() => setIsFlipped(!isFlipped)}>Meal History</Button>
                            </div>
                        </CardTitle>
                        <CardDescription>Log your meal</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-100 w-full pr-2 pb-12">
                            <MealHistory isFlipped={isFlipped} />
                        </div>
                    </CardContent>
                </Card>
            </div>

        </motion.div>
    )
}

export default MealPage
