import dynamic from 'next/dynamic'
import React from 'react'

const AdminDashboard = dynamic(()=>import("./AdminDashboard"))
const AdminDashboardHOC = () => {
  return (
    <div>
      <AdminDashboard/>
    </div>
  )
}

export default AdminDashboardHOC
