'use client';

import React, { useState } from 'react'
import { Activity, Droplets, Flame, Star, Target, TrendingUp, Trophy } from 'lucide-react'
import { StatCard } from './StatCard';

const StastContainer = () => {

    const [todayStats] = useState({
        caloriesConsumed: 0,
        caloriesTarget: 2000,
        proteinConsumed: 0,
        proteinTarget: 120,
        workoutsCompleted: 0,
        workoutsTarget: 1,
        waterIntake: 0,
        waterTarget: 8
    });

    const workoutProgress = (todayStats.workoutsCompleted / todayStats.workoutsTarget) * 100;

    return (
        <div className='md:px-12 px-4 grid space-x-3 md:grid-cols-4 grid-cols-1 gap-4'>
            <StatCard
                title="Calories"
                icon={<Flame className="h-5 w-5 text-orange-500" />}
                value={todayStats.caloriesConsumed}
                target={todayStats.caloriesTarget}
                unit=""
                bgColor="bg-gray-700"
                textColor="text-white"
                messageIcon={<TrendingUp className="h-3 w-3" />}
                messageText={`${todayStats.caloriesTarget - todayStats.caloriesConsumed} remaining`}
            />

            {/* Protein Card */}
            <StatCard
                title="Protein"
                icon={<Target className="h-5 w-5 text-blue-500" />}
                value={todayStats.proteinConsumed}
                target={todayStats.proteinTarget}
                unit=""
                bgColor="bg-white"
                textColor="text-white"
                messageIcon={<TrendingUp className="h-3 w-3" />}
                messageText={`${todayStats.proteinTarget - todayStats.proteinConsumed} remaining`}
            />

            <StatCard
                title="Workouts"
                icon={<Activity className="h-5 w-5 text-green-500" />}
                value={todayStats.workoutsCompleted}
                target={todayStats.workoutsTarget}
                messageIcon={workoutProgress >= 100 ? <Trophy className="h-3 w-3" /> : <Star className="h-3 w-3" />}
                messageText="Keep going! 💪"
                completedText="Goal completed! 🎉"
                isCompleted={workoutProgress >= 100}
                bgColor="bg-white"
                textColor="text-white"
            />

            <StatCard
                title="Hydration"
                icon={<Droplets className="h-5 w-5 text-cyan-500" />}
                value={todayStats.waterIntake}
                target={todayStats.waterTarget}
                unit=" glasses"
                bgColor="bg-white"
                textColor="text-white"
                messageIcon={<Droplets className="h-3 w-3" />}
                messageText={`${todayStats.waterTarget - todayStats.waterIntake} glasses left`}
            />
        </div>
    )
}

export default StastContainer
