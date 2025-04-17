import dynamic from 'next/dynamic'
import React from 'react'

const UserDashboard = dynamic(()=>import("./UserDashboard"))
const UserDashboardHOC = () => {
  return (
    <div>
      <UserDashboard/>
    </div>
  )
}

export default UserDashboardHOC
