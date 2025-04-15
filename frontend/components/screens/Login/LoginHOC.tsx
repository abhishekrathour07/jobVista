import dynamic from 'next/dynamic'
import React from 'react'

const Login = dynamic(() => import("./Login"))

const LoginHOC = () => {
    return (
        <div>
            <Login />
        </div>
    )
}

export default LoginHOC
