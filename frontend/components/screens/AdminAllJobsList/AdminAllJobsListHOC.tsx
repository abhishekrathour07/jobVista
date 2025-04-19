import Navbar from '@/components/custom/Navbar/Navbar'
import dynamic from 'next/dynamic'
import React from 'react'

const AdminAllJobsList = dynamic(() => import("./AdminAllJobsList"))
const AdminAllJobsListHOC = () => {
    return (
        <div className='bg-indigo-50 h-[100vh] overflow-y-scroll hide-scrollbar'>
            <Navbar />
            <AdminAllJobsList />
        </div>
    )
}

export default AdminAllJobsListHOC
 