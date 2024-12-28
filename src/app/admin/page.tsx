import { AdminLogin } from '@/components/auth/AdminLogin'
import React from 'react'
import { cookies } from 'next/headers'
import Dashboard from '@/components/admin/Dashboard'

const page = async () => {
    const cookieStore = await cookies()
    const loggedIn = cookieStore.get('loggedIn')

  return (
    <>
    {
        loggedIn && <Dashboard />
    }
    {
        !loggedIn && <AdminLogin />
    }
    </>
  )
}

export default page