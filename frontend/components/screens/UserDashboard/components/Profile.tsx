"use client"

import CustomButton from '@/components/custom/CustomButton/CustomButton'
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

// ✅ Type definition for the form
type aboutType = {
    name: string
    email: string
    location: string
    relationshipStatus: string
    phone: string
}

const sampleData: aboutType = {
    name: 'Abhishek Singh',
    email: 'BCA - Acharya College',
    location: 'Bangalore',
    relationshipStatus: 'Single',
    phone: "9337474321"
}

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [data, setData] = useState<aboutType | null>(sampleData)

    const form = useForm<aboutType>({
        defaultValues: data || {
            name: '',
            email: '',
            location: '',
            relationshipStatus: '',
            phone: ''
        },
    })

    const onSubmit = (values: aboutType) => {
        setData(values)
        setIsEditing(false)
    }

    return (
        <div className='bg-white text-black border border-indigo-700 rounded-lg p-6 relative'>
            <div>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-bold'>Personal Information</h1>
                    <Button
                        variant="ghost"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <Edit className='h-5 w-5' /> Edit
                    </Button>

                </div>
                {!isEditing ? (
                    <div className='space-y-4'>
                        <div>
                            <h3 className='text-gray-400'>name</h3>
                            <p>{data?.name || 'Not provided'}</p>
                        </div>
                        <div>
                            <h3 className='text-gray-400'>email</h3>
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            {['name', 'email', 'location', 'relationshipStatus', "phone"].map((fieldName) => (
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
                                <CustomButton className='h-10 w-40' label='Save' onClick={form.handleSubmit(onSubmit)} />
                                <Button
                                    className='border h-10 w-40 bg-transparent text-black hover:bg-transparent'
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>

        </div>
    )
}

export default Profile
