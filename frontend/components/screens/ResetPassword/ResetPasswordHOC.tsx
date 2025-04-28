import dynamic from 'next/dynamic'
import React from 'react'

const ResetPassword = dynamic(() => import("./ResetPassword"))
const ResetPasswordHOC = () => {
    return (
        <div>
            <ResetPassword />
        </div>
    )
}

export default ResetPasswordHOC
