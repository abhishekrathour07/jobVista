import dynamic from 'next/dynamic'
import React from 'react'

const ForgotPassword = dynamic(()=>import("./ForgotPassword"))
const ForgotPasswordHOC = () => {
  return (
    <div>
      <ForgotPassword/>
    </div>
  )
}

export default ForgotPasswordHOC
