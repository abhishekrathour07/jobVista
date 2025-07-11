"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form, FormControl, FormField, FormItem, FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import jobServices from '@/services/Job.services';
import toast from 'react-hot-toast';
import SelectFile from '@/components/custom/SelectFile/SelectFile';
import { JobFormValues } from '../../AdminPostJob/components/validation/Addjob.validation';
import { Button } from '@/components/ui/button';
import Loader from '@/components/custom/HashLoader/Loader';
import { JobDetailTypes } from '@/types/jobDetail.types';
import { ApiError } from '@/types/Error.type';

type EditJobDrawerProps = {
    setShowUserInfo: Dispatch<SetStateAction<boolean>>,
    showUserInfo: boolean,
    jobId: string | null, 
}
const EditJobDrawer: React.FC<EditJobDrawerProps> = ({ jobId, setShowUserInfo, showUserInfo }) => {

    const [jobDetailData, setJobDetailData] = useState<JobDetailTypes>()
    const [steps, setSteps] = useState(1)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [loading, setloading] = useState(false)

    const fetchJobDetailData = async () => {
        setloading(true);
        try {
            const response = await jobServices.getJobById(jobId as string)
            setJobDetailData(response?.data?.job);
        } catch (error: unknown) {
            const err = error as ApiError;
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (jobId) {
            fetchJobDetailData();
        }
    }, [jobId]);

    const defaultValues = {
        jobtitle: jobDetailData?.jobtitle || "",
        companyname: jobDetailData?.companyname || "",
        companyUrl: jobDetailData?.companyUrl || "",
        companyInfo: jobDetailData?.companyInfo || "",
        industryType: jobDetailData?.industryType || "",
        companySize: jobDetailData?.companySize || "",
        foundedAt: jobDetailData?.foundedAt || "",
        location: jobDetailData?.location || "",
        jobType: jobDetailData?.jobType || "",
        status: jobDetailData?.status || "",
        workplaceType: jobDetailData?.workplaceType || "",
        salaryRange: jobDetailData?.salaryRange || "",
        experience: jobDetailData?.experience || "",
        skills: jobDetailData?.skills || "",
        deadline: jobDetailData?.deadline || "",
        requirements: jobDetailData?.requirements || "",
        tags: jobDetailData?.tags,
        jobDescription: jobDetailData?.jobDescription || "",

    }
    useEffect(() => {
        if (jobDetailData) {
            form.reset(defaultValues);

        }
    }, [jobDetailData]);

    const form = useForm<any>({
        defaultValues: jobDetailData || defaultValues,
        // resolver: yupResolver(jobFormSchema),
    });
    const { control } = form;

    const onSubmit = async (data: JobFormValues) => {
        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append("companyLogo", selectedFile);
            }
            for (const [key, value] of Object.entries(data)) {
                formData.append(key, value as string);
            }
            const response = await jobServices.editJob(jobId as string, formData);
            toast.success(response?.message);
            setShowUserInfo(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };
    return (
        <div className="bg-white text-black w-full  overflow-y-scroll hide-scrollbar ">
            {loading ? (
                <div className=' w-full flex justify-center items-center h-screen'>
                    <div className='h-[60vh]'>
                    <Loader size={50} color='#0118D8' />
                    </div>
                </div>

            ) : (
                <Form {...form}>

                    {steps === 1 &&
                        <div className="flex flex-col gap-6 ">
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
                        </div>
                    }
                    {steps === 2 && (
                        <div className="flex flex-col gap-6 ">
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
                                    <Select onValueChange={field.onChange} defaultValue={jobDetailData?.jobType}>
                                        <FormControl className='w-full'>
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

                            <FormField control={control} name="status" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Status <span className='text-red-600'>*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={jobDetailData?.status}>
                                        <FormControl className='w-full'>
                                            <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='w-full'>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />

                            <FormField control={control} name="workplaceType" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workplace Type <span className='text-red-600'>*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={jobDetailData?.workplaceType}>
                                        <FormControl className='w-full'>
                                            <SelectTrigger><SelectValue placeholder="Select workplace" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='w-full'>
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
                        </div>
                    )}
                    {steps === 3 && (
                        <div className="flex flex-col gap-6 w-full ">
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
                            <FormField control={control} name="companyInfo" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Info <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Brief company description" />
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={control} name="jobDescription" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description <span className='text-red-600'>*</span></FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Describe responsibilities, expectations, etc." />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>
                    )}
                    {steps === 4 && (
                        <div className="flex flex-col gap-6 ">
                            <p>Company Logo <span className='text-red-600'>*</span></p>
                            <SelectFile id='logo-company' setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
                        </div>
                    )}


                    <div className='fixed bottom-4 flex gap-6'>
                        <Button className="w-full" onClick={() => steps === 1 ? setShowUserInfo(!showUserInfo) : setSteps(steps - 1)}>{steps !== 1 ? "back" : "Cancel"}</Button>
                        <Button className="w-full bg-indigo-800 hover:bg-indigo-900 text-white" onClick={steps !== 4 ? () => setSteps(steps + 1) : form.handleSubmit(onSubmit)} >
                            {steps !== 4 ? "Next" : "Submit"}
                        </Button>
                    </div>
                </Form>
            )}

        </div>
    );
};

export default EditJobDrawer;
