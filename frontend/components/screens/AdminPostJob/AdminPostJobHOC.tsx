import Navbar from '@/components/custom/Navbar/Navbar'
import dynamic from 'next/dynamic'
import React from 'react'

const AdminPostJob = dynamic(() => import("./AdminPostJob"))

const AdminPostJobHOC = () => {
    return (
        <div className=' h-full md:h-[100vh] bg-indigo-50'>
            <Navbar/>
            <AdminPostJob />
        </div>
    )
}

export default AdminPostJobHOC
