'use client'

import React from 'react'
import { Mail, Phone, Globe, Heart, DownloadIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ProfileCard = () => {
    return (
        <div className="w-full md:max-w-md  border border-indigo-600 mx-auto bg-white rounded-2xl p-6 shadow-md">
            <div className="flex flex-col items-center space-y-2">
                <Avatar className='w-20 h-20'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="font-semibold text-lg">Abhishek Singh</h2>
                    <p className="text-sm text-gray-500">3D Designer</p>
                </div>
            </div>

            <div className="my-4 border-t" />

            <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>lincoln@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>089318298493</span>
                </div>
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span>GMT +07:00</span>
                </div>
                <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span>Single</span>
                </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t" />
            <p className='flex border border-indigo-700 justify-between p-2 rounded-full px-6'>
               Download Resume <DownloadIcon className='text-indigo-700'/>
            </p>

        </div>
    )
}

export default ProfileCard
