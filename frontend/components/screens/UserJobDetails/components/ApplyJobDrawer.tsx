'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { applySchema } from './validation/ApplyjobForm.validation'





const ApplyJobDrawer = () => {
    const form = useForm<any>({
        resolver: yupResolver(applySchema),
        defaultValues: {
            fullName: '',
            email: '',
            resume: undefined,
            message: '',
            phone: ''
        }
    })

    const onSubmit = (data: any) => {
        console.log('Form Submitted:', data)
    }

    return (
        <Form {...form}>
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name <span className='text-red-600'>*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage className='text-sm text-red-600' />

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address  <span className='text-red-600'>*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage className='text-sm text-red-600' />

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel>Resume (PDF/DOCX)  <span className='text-red-600'>*</span></FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => onChange(e.target.files?.[0])}
                                    {...rest}
                                />
                            </FormControl>
                            <FormMessage className='text-sm text-red-600' />

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone  <span className='text-red-600'>*</span></FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder='Enter your contact number'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-sm text-red-600' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Add a message or cover letter (max 500 chars)" {...field} />
                            </FormControl>
                            <FormMessage className='text-sm text-red-600' />

                        </FormItem>
                    )}
                />

                <div className='fixed bottom-4 flex gap-4'>
                    <Button className="w-full">Cancel</Button>
                    <Button className="w-full bg-indigo-800 hover:bg-indigo-900 text-white" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                </div>
            </div>
        </Form>
    )
}

export default ApplyJobDrawer
