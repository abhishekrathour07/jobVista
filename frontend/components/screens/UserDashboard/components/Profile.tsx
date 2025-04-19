"use client"

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Edit } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ProfileCard from './ProfileCard'

// ✅ Type definition for the form
type aboutType = {
    name: string
    email: string
    location: string
    relationshipStatus: string
    phone: string
    Resume:string
}

const sampleData: aboutType = {
    name: 'Abhishek Singh',
    email: 'BCA - Acharya College',
    location: 'Bangalore',
    relationshipStatus: 'Single',
    phone: "9337474321",
    Resume:"jfjjhfj"
}

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [data, setData] = useState<aboutType | null>(sampleData)

    const form = useForm<aboutType>({
        defaultValues: data || {
            name: '',
            email: '',
            location: '',
            phone: '',
            Resume:"",
            relationshipStatus: '',
        },
    })

    const onSubmit = (values: aboutType) => {
        setData(values)
        setIsEditing(false)
    }

    return (
        <div className='bg-white flex flex-col flex-1 w-full text-black border border-indigo-700 rounded-lg p-6 relative'>
                <div className='flex justify-between w-full'>
                    <h1 className='text-2xl font-bold'>Personal Information</h1>
                    <Button
                        variant="ghost"
                        onClick={() => setIsEditing(!isEditing)}
                        aria-label="Edit Personal Information"
                    >
                        <Edit className='h-5 w-5' /> Edit
                    </Button>
                </div>
                {!isEditing ? (
                    <div className='space-y-4 w-full'>
                        <div>
                            <h3 className='text-gray-400'>Name</h3>
                            <p>{data?.name || 'Not provided'}</p>
                        </div>
                        <div>
                            <h3 className='text-gray-400'>Email</h3>
                            <p>{data?.email || 'Not provided'}</p>
                        </div>
                        <div>
                            <h3 className='text-gray-400'>Location</h3>
                            <p>{data?.location || 'Not provided'}</p>
                        </div>
                        <div>
                            <h3 className='text-gray-400'>Relationship Status</h3>
                            <p>{data?.relationshipStatus || 'Not provided'}</p>
                        </div>
                        <div>
                            <h3 className='text-gray-400'>Phone</h3>
                            <p>{data?.phone || 'Not provided'}</p>
                        </div>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
                            {['name', 'email', 'location', 'relationshipStatus', "phone","Resume"].map((fieldName) => (
                                <FormField
                                    key={fieldName}
                                    control={form.control}
                                    name={fieldName as keyof aboutType}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={`Your ${fieldName}`} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <div className='w-full flex gap-4 justify-start'>
                                <Button
                                    className='h-10 w-40 bg-indigo-700 text-white hover:bg-indigo-800'
                                    type="submit"
                                    aria-label="Save Changes"
                                >
                                    Save
                                </Button>
                                <Button
                                    className='border h-10 w-40 bg-transparent text-black hover:bg-gray-100'
                                    onClick={() => setIsEditing(false)}
                                    aria-label="Cancel Editing"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
    )
}

const ProfileMain = () => {
    return (
        <div className='flex flex-col md:flex-row gap-6'>
            <ProfileCard />
            <div className='w-full'>
                <Profile />
            </div>
        </div>
    )
}

export default ProfileMain
