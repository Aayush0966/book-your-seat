import { AdminLogin } from '@/components/auth/AdminLogin'
import React from 'react'

const page = () => {

    const loggedIn = false

  return (
    <>
    {
        loggedIn && <div>Hi</div>
    }
    {
        !loggedIn && <AdminLogin />
    }
    </>
  )
}

export default page