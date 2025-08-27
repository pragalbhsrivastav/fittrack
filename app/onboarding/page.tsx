import React from 'react'
import OnBoardingPage from '../../components/OnBoarding/OnBoardingPage'
import { UserProvider } from '@/hooks/UserContext'

const page = () => {
  return (
    <div>
      <UserProvider>
        <OnBoardingPage />
      </UserProvider>
    </div>
  )
}

export default page
