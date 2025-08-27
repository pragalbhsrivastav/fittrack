import { Progress } from '@/components/ui/progress'
import React from 'react'

interface ProgressTackerTypes {
    progress: number, step: number, totalSteps: number
}


const ProgrssTracker: React.FC<ProgressTackerTypes> = ({ progress, step, totalSteps }) => {
    return (
        <>
            <Progress value={progress} className="w-full h-3" />
            <p className='mt-4 text-gray-300'> Step {step} of {totalSteps} </p>
        </>
    )
}

export default ProgrssTracker
