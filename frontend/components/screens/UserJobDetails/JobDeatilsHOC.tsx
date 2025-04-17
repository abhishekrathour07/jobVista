import Navbar from '@/components/custom/Navbar/Navbar'
import dynamic from 'next/dynamic'
import React from 'react'

const JobDeatils = dynamic(()=>import("./JobDeatils"))
const JobDeatilsHOC = () => {
  return (
    <div>
        <Navbar/>
      <JobDeatils/>
    </div>
  )
}

export default JobDeatilsHOC
