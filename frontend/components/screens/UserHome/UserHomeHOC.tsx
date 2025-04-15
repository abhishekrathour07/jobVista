import dynamic from 'next/dynamic'
import React from 'react'

const UserHome = dynamic(() => import("./UserHome"))

const UserHomeHOC = () => {
    return (
        <div>
            <UserHome />
        </div>
    )
}

export default UserHomeHOC
