"use client"
import React from 'react'
import ProfileMain from '../UserDashboard/components/Profile'
import Navbar from '@/components/custom/Navbar/Navbar'


const Profile = () => {


    return (
        <div className='bg-indigo-50 h-[100vh] flex flex-col space-y-2'>
            <Navbar />
            <div className='md:flex md:flex-col p-6 w-full'>
                <ProfileMain />
            </div>

        </div>
    )
}

export default Profile
