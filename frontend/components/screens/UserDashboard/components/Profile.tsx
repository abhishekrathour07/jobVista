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
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ProfileCard from './ProfileCard'
import profileService from '@/services/Profile.services'
import toast from 'react-hot-toast'

type aboutType = {
    name: string
    email: string
    location: string
    relationshipStatus: string
    phone: string
    Resume: string
}

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [data, setData] = useState<aboutType | null>(null)
    const [loading, setLoading] = useState(true)

    const getUserDetail = async () => {
        setLoading(true)
        try {
            const response = await profileService.loggedinUserDetail()
            setData(response?.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserDetail()
    }, [])

    const form = useForm<aboutType>({
        defaultValues: data || {
            name: '',
            email: '',
            location: '',
            phone: '',
            Resume: '',
            relationshipStatus: '',
        },
    })

    const onSubmit = (values: aboutType) => {
        setData(values)
        setIsEditing(false)
    }

    if (loading) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 h-[70vh] overflow-y-scroll hide-scrollbar border border-gray-300 animate-pulse">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index}>
                            <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
                            <div className="h-6 w-full bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 h-[80vh] overflow-y-scroll hide-scrollbar border border-gray-300">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Personal Information</h1>
                <Button
                    variant="ghost"
                    onClick={() => setIsEditing(!isEditing)}
                    aria-label="Edit Personal Information"
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                >
                    <Edit className="h-5 w-5" /> Edit
                </Button>
            </div>

            {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Name</h3>
                        <p className="text-gray-800">{data?.name || 'Not provided'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Email</h3>
                        <p className="text-gray-800">{data?.email || 'Not provided'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Location</h3>
                        <p className="text-gray-800">{data?.location || 'Not provided'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Relationship Status</h3>
                        <p className="text-gray-800">{data?.relationshipStatus || 'Not provided'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Phone</h3>
                        <p className="text-gray-800">{data?.phone || 'Not provided'}</p>
                    </div>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {['name', 'email', 'location', 'relationshipStatus', 'phone', 'Resume'].map((fieldName) => (
                            <FormField
                                key={fieldName}
                                control={form.control}
                                name={fieldName as keyof aboutType}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold text-gray-600">
                                            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`Your ${fieldName}`}
                                                {...field}
                                                className="border-gray-300"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <div className="flex gap-4">
                            <Button
                                className="h-10 w-40 bg-indigo-600 text-white hover:bg-indigo-700"
                                type="submit"
                                aria-label="Save Changes"
                            >
                                Save
                            </Button>
                            <Button
                                className="h-10 w-40 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
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
        <div className="flex flex-col md:flex-row gap-6">
            <ProfileCard />
            <div className="w-full">
                <Profile />
            </div>
        </div>
    )
}

export default ProfileMain
