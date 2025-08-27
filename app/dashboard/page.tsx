import AnimatedCircles from '@/components/AnimatedCircle'
import CommonBackground from '@/components/CommonBackground'
import React from 'react'
import gym2 from '@/public/gym10.jpg'
import DashboardHeader from '@/components/DashboardComponents/DashboardHeader'
import ProfileCard from '@/components/DashboardComponents/ProfileCard'
import QuickAccessCard from '@/components/DashboardComponents/QuickAccessCard'
import StastContainer from '@/components/DashboardComponents/StastContainer'
import { UserProvider } from '@/hooks/UserContext'
import ProfileSection from '@/components/Profile/ProfileSection'

const page = () => {
  return (
    <UserProvider>
      <div>
        <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-700 to-black'>

          <AnimatedCircles />

          {/* Hero Background Image */}
          <div className="absolute inset-0 opacity-10">
            <CommonBackground bgImg={gym2} />
          </div>

          <div className="relative z-10">

            <DashboardHeader />
            <div className="container mx-auto  py-16">

              {/* Tracking Card */}
              <StastContainer />

              <div className='pt-10 px-4 md:px-12 grid md:grid-cols-3 grid-cols-1 gap-4'>
                {/* Quick Action Card */}
                <QuickAccessCard />
                {/* profile card */}
                <ProfileCard />
                {/* <ProfileSection /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  )
}

export default page
