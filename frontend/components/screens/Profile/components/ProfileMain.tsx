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
import { Textarea } from '@/components/ui/textarea'
import SelectFile from '@/components/custom/SelectFile/SelectFile'

type aboutType = {
    name: string
    email: string
    location: string
    phone: string
    resumeUrl: string
    profileImage: string
    skills: string
}

const ProfileMain = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [data, setData] = useState<aboutType | null>(null)
    const [loading, setLoading] = useState(true)
    const [resumeUrl, setresumeUrl] = useState<File | null>(null)
    const [profilePic, setprofilePic] = useState<File | null>(null)

    const form = useForm<aboutType>({
        defaultValues: {
            name: '',
            email: '',
            location: '',
            phone: '',
            skills: '',
        },
    })
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await profileService.loggedinUserDetail()
                setData(response?.data)
                form.reset(response?.data)
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [form])

    const onSubmit = async (values: aboutType) => {
        setLoading(true)
        try {
            const formData = new FormData()
            if (typeof values.skills === "string") {
                const skillsArray = values.skills.split(',').map(skill => skill.trim());
                skillsArray.forEach(skill => {
                    formData.append("skills", skill);
                });
            }

            if (profilePic) {
                formData.append("profileImage", profilePic)
            }
            if (resumeUrl) {
                formData.append("resumeUrl", resumeUrl) // match backend field name
            }
            formData.append("location", values.location)
            formData.append("name", values.name)
            formData.append("email", values.email)
            formData.append("phone", values.phone)



            const response = await profileService.editUserDetail(formData)
            setData(response?.data)
            toast.success("Profile updated")
            setIsEditing(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 h-[70vh] overflow-y-scroll hide-scrollbar border border-gray-300 animate-pulse">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 7 }).map((_, index) => (
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
        <div className="flex flex-col md:flex-row gap-6">
            <ProfileCard {...data as any} />
            <div className="w-full">
                <div className="bg-white shadow-md rounded-lg p-6 h-[80vh] overflow-y-scroll hide-scrollbar border border-gray-300">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-indigo-800">Personal Information</h1>
                        <Button
                            variant="ghost"
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                        >
                            <Edit className="h-5 w-5" /> Edit
                        </Button>
                    </div>

                    {!isEditing ? (
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { label: 'Name', value: data?.name },
                                { label: 'Email', value: data?.email },
                                { label: 'Location', value: data?.location },
                                { label: 'Phone', value: data?.phone },
                                { label: 'Skills', value: data?.skills },
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <h3 className="text-sm font-semibold text-gray-500">{item.label}</h3>
                                    <p className="text-gray-800">{item.value || 'Not provided'}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {['name', 'email', 'location', 'phone', 'skills'].map((field) => (
                                    <FormField
                                        key={field}
                                        control={form.control}
                                        name={field as keyof aboutType}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold text-black">
                                                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                                    <span className='text-red-600'>*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    {field.name === 'skills' ? (
                                                        <Textarea placeholder="e.g. HTML, CSS, JS" {...field} className="border-gray-300" />
                                                    ) : (
                                                        <Input placeholder={`Your ${field.name}`} {...field} className="border-gray-300" />
                                                    )}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}

                                <div className='flex flex-col'>
                                    <h2 className="font-semibold mb-1">Resume (PDF/DOCX)</h2>
                                    <SelectFile id="resume-upload" selectedFile={resumeUrl} setSelectedFile={setresumeUrl} />
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className="font-semibold mb-1">Profile Pic</h2>
                                    <SelectFile id='profile-pic' selectedFile={profilePic} setSelectedFile={setprofilePic} />
                                </div>

                                <div className="flex gap-4">
                                    <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                                        Save
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
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
        </div>
    )
}

export default ProfileMain
