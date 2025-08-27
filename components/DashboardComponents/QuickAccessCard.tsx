'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { MoveLeftIcon, MoveRightIcon, Trophy } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const QuickAccessCard = () => {
    const router = useRouter()

    return (
        <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2 text-2xl">
                    Quick Actions
                </CardTitle>
                <CardDescription className="text-gray-600">Log your daily activities and update profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* <Button className='w-full' onClick={() => router.push('/quickactions')}> Log Workout <MoveRightIcon /></Button>
                <Button className='w-full' onClick={() => router.push('/quickactions')}>  Log Meals <MoveRightIcon /></Button>
                <Button className='w-full' onClick={() => router.push('/quickactions')}> Log Hydration <MoveRightIcon /></Button>
                <Button className='w-full' onClick={() => router.push('/quickactions')}> Update Goal <MoveRightIcon /></Button> */}
                <Button className='w-full' onClick={() => router.push('/quickactions')}> Log Activity <MoveRightIcon /></Button>
                <Button className='w-full' onClick={() => router.push('/profile')}>Update Your Profile <MoveRightIcon /></Button>
            </CardContent>
        </Card>
    );
};

export default QuickAccessCard;
