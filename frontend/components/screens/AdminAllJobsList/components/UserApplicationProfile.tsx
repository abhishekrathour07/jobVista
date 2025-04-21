"use client"
import React from 'react'
import ProfileMain from '../../Profile/components/ProfileMain'
import Navbar from '@/components/custom/Navbar/Navbar'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const UserApplicationProfile = () => {
    const router = useRouter();
    return (
        <div className='bg-indigo-50 h-[100vh] overflow-y-scroll hide-scrollbar'>
            <Navbar />
            <div className='p-4'>
                <button
                    className='flex items-center gap-2 px-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition-all'
                    onClick={() => router.back()}
                >
                    <ArrowLeft className='w-4 h-4' />
                    <span>Back</span>
                </button>
            </div>
            <div className='p-8 rounded-lg '>
                <ProfileMain />
            </div>
        </div>
    )
}

export default UserApplicationProfile
