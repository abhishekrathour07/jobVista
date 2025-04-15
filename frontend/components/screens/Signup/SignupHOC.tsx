import dynamic from 'next/dynamic'
import React from 'react'

const Signup = dynamic(()=>import("./Signup"))
const SignupHOC = () => {
  return (
    <div>
      <Signup/>
    </div>
  )
}

export default SignupHOC
