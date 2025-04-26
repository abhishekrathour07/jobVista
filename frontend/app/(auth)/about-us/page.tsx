import AboutUs from '@/components/custom/AboutUs/AboutUs'
import Navbar from '@/components/custom/Navbar/Navbar'
import React from 'react'

const page = () => {
    return (
        <div className='bg-indigo-100 h-screen'>
            <Navbar/>
            <AboutUs />
        </div>
    )
}

export default page
