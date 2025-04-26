'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ApplyFormValues, applySchema } from './validation/ApplyjobForm.validation'
import toast from 'react-hot-toast'
import applicantServices from '@/services/Applicants.services'
import SelectFile from '@/components/custom/SelectFile/SelectFile'
import Loader from '@/components/custom/HashLoader/Loader'
import { ApiError } from '@/types/Error.type'


const ApplyJobDrawer = ({ jobId, onClose, showUserInfo }: { jobId: string; onClose: Dispatch<SetStateAction<boolean>>, showUserInfo: boolean }) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [loading, setloading] = useState<boolean>(false)
    const form = useForm<ApplyFormValues>({
        resolver: yupResolver(applySchema),
        defaultValues: {
            resume: undefined as unknown as File,
            message: ""
        }
    });


    const onSubmit = async (data: ApplyFormValues) => {
        setloading(true)
        try {
            const formData = new FormData()

            formData.append("coverLetter", data.message)
            if (selectedFile) {
                formData.append("resumeUrl", selectedFile)

            }


            const response = await applicantServices.applyToJOb(jobId, formData)
            toast.success(response?.message || "Application submitted!")
            onClose(!showUserInfo)
        } catch (error: unknown) {
            const err = error as ApiError;
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setloading(false)
        }
    }

    return (
        <Form {...form}>
            <div className="space-y-4">
                <div>
                    <h1>Resume File</h1>
                    <SelectFile setSelectedFile={setSelectedFile} selectedFile={selectedFile} id='job-applied' />
                </div>

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cover Letter</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write a message (optional)" {...field} />
                            </FormControl>
                            <FormMessage className='text-sm text-red-600' />
                        </FormItem>
                    )}
                />

                <div className='fixed bottom-4 flex gap-4'>
                    <Button className="w-full" onClick={() => onClose(!showUserInfo)}>Cancel</Button>
                    <Button className="w-full bg-indigo-800 hover:bg-indigo-900 text-white" onClick={form.handleSubmit(onSubmit)} >
                        {loading ? <Loader /> : "Submit"}

                    </Button>
                </div>

            </div>
        </Form>
    )
}

export default ApplyJobDrawer
