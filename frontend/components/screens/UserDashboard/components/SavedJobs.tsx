"use client"
import React, { useEffect, useState } from 'react'
import SavedJobCards from './SavedJobCards'
import CustomPagination from '@/components/custom/Pagination/Pagination'
import saveJobService from '@/services/savedJob.services'
import toast from 'react-hot-toast'
import { SavedData, savedJobResponseType } from '@/types/savedJobTypes'
import { ApiError } from '@/types/Error.type'

const SavedJobs = () => {
    const [currentPage, setCurrentpage] = useState(1)
    const [jobData, setJobsData] = useState<savedJobResponseType>();
    const jobsPerPage = 4;

    const getAllSavedJob = async () => {
        try {
            const response = await saveJobService.getallSavedJob(currentPage, jobsPerPage);
            setJobsData(response?.data)
        } catch (error: unknown) {
            const err = error as ApiError;
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        getAllSavedJob()
    }, [currentPage])

    return (
        <div className='flex flex-col border border-indigo-700 rounded-md bg-white space-y-5 p-6'>
            <h1 className='text-2xl font-bold'>Saved Jobs</h1>
            {jobData?.savedData?.map((data: SavedData,) => (
                <SavedJobCards key={data.id} {...data} />
            ))}
            {jobData?.totalPages === 1 && (
                <CustomPagination totalPages={jobData?.totalPages} currentPage={currentPage} onPageChange={setCurrentpage} />

            )}
        </div>
    )
}

export default SavedJobs
