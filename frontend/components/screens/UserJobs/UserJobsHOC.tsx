import dynamic from 'next/dynamic'
import React from 'react'

const UserJobs = dynamic(() => import("./UserJobs"))

const UserJobsHOC = () => {
    return (
        <div>
            <UserJobs />
        </div>
    )
}

export default UserJobsHOC
