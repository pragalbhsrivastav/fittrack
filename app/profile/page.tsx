import AnimatedCircles from '@/components/AnimatedCircle'
import CommonBackground from '@/components/CommonBackground'
import ProfileSection from '@/components/Profile/ProfileSection'
import { UserProvider } from '@/hooks/UserContext'
import React from 'react'
import gymBG from '@/public/gymnew1.jpg';


const page = () => {
    return (
        <UserProvider>
            <div>
                <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-700 to-black'>

                    <AnimatedCircles />

                    {/* Hero Background Image */}
                    <div className="absolute inset-0 opacity-10">
                        <CommonBackground bgImg={gymBG} />
                    </div>

                    <div className="relative z-10 p-4">
                        <ProfileSection />
                    </div>
                </div>
            </div>
        </UserProvider>
    )
}

export default page
