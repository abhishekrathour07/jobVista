'use client'

import React from 'react'
import { Mail, Phone, Globe, DownloadIcon, MapPin } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Skills from './Skills'

type ProfileCardType = {
    name: string
    email: string
    location: string
    phone: string
    resumeUrl: string
    profileImage: string
    skills: string[],
    role: string
    createdAt: string
}
const ProfileCard: React.FC<ProfileCardType> = ({
    name, email, location, role, profileImage, createdAt, phone, skills
}) => {
    return (
        <div className="w-full md:max-w-md h-auto border mx-auto bg-white rounded-2xl p-6 shadow-md">
            <div className="flex flex-col items-center space-y-2">
                <Avatar className="w-20 h-20">
                    <AvatarImage
                        src={
                            profileImage?.trim()
                                ? profileImage
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=4676dd&color=ffffff`
                        }
                    />
                </Avatar>

                <div className="text-center">
                    <h2 className="font-semibold text-lg">{name}</h2>
                    <p className="text-sm text-gray-500">{role==="user"?"Student":"Administrator"}</p>
                </div>
            </div>

            <div className="my-4 border-t" />

            <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{location}</span>
                </div>

            </div>

            <div className="my-4 border-t flex flex-col gap-4" >
                <Skills skills={skills} />
                <p className='flex border border-indigo-700 justify-between p-2 rounded-full px-6'>
                    Download Resume <DownloadIcon className='text-indigo-700' />
                </p>
            </div>
        </div>
    )
}

export default ProfileCard
