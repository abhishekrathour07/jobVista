"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@/components/custom/CustomButton/CustomButton';

import {
    Form, FormControl, FormField, FormItem, FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobFormSchema, JobFormValues } from './validation/Addjob.validation';
import jobServices from '@/services/Job.services';
import toast from 'react-hot-toast';
import SelectFile from '@/components/custom/SelectFile/SelectFile';

const AdminPostJobForm = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const form = useForm<any>({
        defaultValues: {
            jobtitle: '',
            companyname: '',
            companyUrl: '',
            companyInfo: '',
            industryType: '',
            companySize: '',
            foundedAt: undefined,
            location: '',
            jobType: "fulltime",
            jobStatus: 'active',
            workplace: 'hybrid',
            salaryRange: '',
            experience: '',
            skills: '',
            deadline: undefined,
            requirements: '',
            tags: '',
            jobDescription: '',
        },
        resolver: yupResolver(jobFormSchema),
    });

    const { control, handleSubmit } = form;

    const onSubmit = async (data: JobFormValues) => {
        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append("companyLogo", selectedFile);
            }
            // Append the rest of the fields
            for (const [key, value] of Object.entries(data)) {
                formData.append(key, value as string);
            }

            const response = await jobServices.createJob(formData);
            toast.success(response?.message);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="bg-white border text-black h-[80vh] overflow-y-scroll hide-scrollbar rounded-lg shadow-md">
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-indigo-800">Post a New Job</h2>
                <Form {...form}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <FormField control={control} name="jobtitle" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., Frontend Developer" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="companyname" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., Google" />
                                </FormControl>
                            </FormItem>
                        )} />


                        <FormField control={control} name="companyUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Website</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g.,https://company.com" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="industryType" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Industry Type <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., IT Services" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="companySize" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Size <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., 500+" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="foundedAt" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Founded Year <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} placeholder="e.g., 2010" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="location" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., Bangalore" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="jobType" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Type <span className='text-red-600'>*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl  className='w-full'>
                                        <SelectTrigger><SelectValue placeholder="Select job type" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='w-full'>
                                        <SelectItem value="fulltime">Full-Time</SelectItem>
                                        <SelectItem value="parttime">Part-Time</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />

                        <FormField control={control} name="jobStatus" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Status <span className='text-red-600'>*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl  className='w-full'>
                                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent  className='w-full'>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />

                        <FormField control={control} name="workplace" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Workplace Type <span className='text-red-600'>*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl  className='w-full'>
                                        <SelectTrigger><SelectValue placeholder="Select workplace" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent  className='w-full'>
                                        <SelectItem value="remote">Remote</SelectItem>
                                        <SelectItem value="onsite">On-site</SelectItem>
                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />

                        <FormField control={control} name="salaryRange" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Salary Range <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., ₹4–8 LPA" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="experience" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., 2+ years" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="skills" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Skills <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., React, Node.js" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="deadline" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Application Deadline <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="requirements" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Requirements <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="List job requirements" />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={control} name="tags" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., Remote, JavaScript" />
                                </FormControl>
                            </FormItem>
                        )} />

                        {/* Full Width */}
                        <div className="md:col-span-2">
                            <FormField control={control} name="companyInfo" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Info <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Brief company description" />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>

                        <div className="md:col-span-2">
                            <FormField control={control} name="jobDescription" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Describe responsibilities, expectations, etc." />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>
                        <div className="md:col-span-2">
                            <FormLabel>Company Logo <span className='text-red-600'>*</span></FormLabel>
                            <SelectFile setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
                        </div>
                    </div>

                    <CustomButton label="Post Job" onClick={handleSubmit(onSubmit)} className="w-full mt-6" />
                </Form>
            </div>
        </div>
    );
};

export default AdminPostJobForm;
