"use client"
import CustomButton from '@/components/custom/CustomButton/CustomButton';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectTrigger, SelectValue } from '@radix-ui/react-select';
import React from 'react'
import { useForm } from 'react-hook-form';
import { jobFormSchema } from './validation/Addjob.validation';

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
            deadline: "",
            workplace: 'remote',
        }, resolver: yupResolver(jobFormSchema),
    }
    );

    const { handleSubmit, control } = form;

    const onSubmit = (data: any) => {
        console.log('Job Data:', data);
    };

    return (
        <div className=' bg-white border text-black overflow-y-scroll hide-scrollbar h-[80vh] rounded-lg'>
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First column */}
                        <FormField
                            control={control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
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
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., TechCorp" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="industryType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Industry Type</FormLabel>
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
                                    <FormLabel>Workplace Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
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
                                    <FormLabel>Founded Year</FormLabel>
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
                                    <FormLabel>Location</FormLabel>
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
                                    <FormLabel>Job Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
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
                                    <FormLabel>Job Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
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
                                    <FormLabel>Salary Range</FormLabel>
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
                                    <FormLabel>Experience Required</FormLabel>
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
                                    <FormLabel>Skills</FormLabel>
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
                                    <FormLabel>Application Deadline</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="md:col-span-2">

                            <FormField
                                control={control}
                                name="companySize"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Size</FormLabel>
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
                                        <FormLabel>Company Info</FormLabel>
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
                                        <FormLabel>Job Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Describe the responsibilities, expectations, etc." />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <CustomButton label='Post job' className='w-full' />
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AdminPostJobForm;
