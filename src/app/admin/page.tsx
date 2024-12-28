import { AdminLogin } from '@/components/auth/AdminLogin'
import React from 'react'
import { cookies } from 'next/headers'

const page = async () => {
    const cookieStore = await cookies()
    const loggedIn = cookieStore.get('loggedIn')

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