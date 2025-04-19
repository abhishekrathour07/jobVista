import dynamic from 'next/dynamic'
import React from 'react'

const AdminAllJobsList = dynamic(() => import("./AdminAllJobsList"))
const AdminAllJobsListHOC = () => {
    return (
        <div>
            <AdminAllJobsList />
        </div>
    )
}

export default AdminAllJobsListHOC
