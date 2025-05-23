import Navbar from '@/components/custom/Navbar/Navbar'
import React from 'react'
import DashboardTabs from './components/DashboardTabs'

const UserDashboard = () => {
    return (
        <div className='bg-indigo-50 h-[100vh] w-full  overflow-y-scroll hide-scrollbar'>
            <Navbar />
            <div className=' p-4 sm:p-8 fle flex-col space-y-5'>
                <div className='flex flex-col justify-center items-start gap-6'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-3xl font-bold'>Dashboard</h1>
                        <p className='text-gray-400'>Manage your job applications and profile.</p>
                    </div>
                </div>
                <div className='w-full'>
                    <DashboardTabs />
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
