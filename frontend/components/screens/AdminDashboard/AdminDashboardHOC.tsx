import Navbar from '@/components/custom/Navbar/Navbar'
import dynamic from 'next/dynamic'
import React from 'react'

const AdminDashboard = dynamic(() => import("./AdminDashboard"))
const AdminDashboardHOC = () => {
  return (
    <div>
      <Navbar />
      <AdminDashboard />
    </div>
  )
}

export default AdminDashboardHOC
