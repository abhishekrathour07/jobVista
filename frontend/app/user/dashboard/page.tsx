import UserDashboardHOC from '@/components/screens/UserDashboard/UserDashboardHOC'
import React, { Suspense } from 'react'

const page = () => {
  return <Suspense fallback={<div>Loading...</div>}>
    <UserDashboardHOC />
  </Suspense>
}

export default page
