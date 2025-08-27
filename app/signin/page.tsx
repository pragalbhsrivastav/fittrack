import React from 'react'
import SignInPage from './SignInPage'
import { UserProvider } from '@/hooks/UserContext'

const page = () => {
  return (
    <div>
      <UserProvider>
        <SignInPage />
      </UserProvider>
    </div>
  )
}

export default page
