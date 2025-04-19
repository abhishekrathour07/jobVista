"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { jobFormSchema } from './validation/Addjob.validation';
import CustomButton from '@/components/custom/CustomButton/CustomButton';

import {
    Form, FormControl, FormField, FormItem, FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const AdminPostJobForm = () => {
    const form = useForm({
        defaultValues: {
            jobTitle: '',
            companyName: '',
            companyInfo: '',
            industryType: '',
            companySize: '',
            foundedAt: '',
            jobdescription: '',
            location: '',
            jobType: undefined,
            jobStatus: 'active',
            salaryRange: '',
            experience: '',
            skills: '',
            deadline: undefined,
            workplace: 'remote',
        },
        resolver: yupResolver(jobFormSchema),
    });

    const { handleSubmit, control, setValue } = form;

    const onSubmit = (data: any) => {
        console.log('Job Data:', data);
    };

    return (
        <div className="bg-white border text-black h-[80vh] overflow-y-auto hide-scrollbar rounded-lg shadow-md">
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-semibold">Post a New Job</h2>

                <Form {...form}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <FormField
                            control={control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., Frontend Developer" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., google" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="industryType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Industry Type <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., IT Services" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="workplace"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workplace Type <span className='text-red-600'>*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className='w-full'>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select workplace" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="remote">Remote</SelectItem>
                                            <SelectItem value="onsite">On-site</SelectItem>
                                            <SelectItem value="hybrid">Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="foundedAt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Founded Year <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="e.g., 2012" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., Bangalore" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="jobType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Type <span className='text-red-600'>*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className='w-full'>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select job type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="full-time">Full-Time</SelectItem>
                                            <SelectItem value="part-time">Part-Time</SelectItem>
                                            <SelectItem value="internship">Internship</SelectItem>
                                            <SelectItem value="contract">Contract</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="jobStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Status <span className='text-red-600'>*</span></FormLabel>
                                    <Select  onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className='w-full'>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="salaryRange"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary Range <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., ₹4-8 LPA" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience Required <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., 2+ years" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="skills"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Skills <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., React, Node.js" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="deadline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Deadline <span className='text-red-600'>*</span></FormLabel>
                                    {/* <DatePicker
                                        selected={field.value}
                                        onSelect={(date) => setValue("deadline", date)}
                                    /> */}
                                </FormItem>
                            )}
                        />

                        {/* Full width fields */}
                        <div className="md:col-span-2">
                            <FormField
                                control={control}
                                name="companySize"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Size <span className='text-red-600'>*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="e.g., 50-200 employees" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <FormField
                                control={control}
                                name="companyInfo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Info <span className='text-red-600'>*</span></FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Brief description about the company" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <FormField
                                control={control}
                                name="jobdescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Description <span className='text-red-600'>*</span></FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Describe the responsibilities, expectations, etc." />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                    <CustomButton label="Post Job" onClick={form.handleSubmit(onSubmit)} className="w-full" />
                </Form>
            </div>
        </div>
    );
};

export default AdminPostJobForm;
