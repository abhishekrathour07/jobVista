"use client"
import React, { useState } from 'react'
import SavedJobCards from './SavedJobCards'
import { savedJobs } from '../data/SavedData'
import CustomPagination from '@/components/custom/Pagination/Pagination'

const SavedJobs = () => {
     const [currentPage, setCurrentpage] = useState(1)
        const jobsPerPage = 4;
        const totalPages = Math.ceil(savedJobs.length / jobsPerPage);
        const startIndex = (currentPage - 1) * jobsPerPage;
        const endIndex = startIndex + jobsPerPage;
    return (
        <div className='flex flex-col border border-indigo-700 rounded-md bg-white space-y-5 p-6'>
            <h1 className='text-2xl font-bold'>Saved Jobs</h1>
            {savedJobs.slice(startIndex,endIndex).map((job, index) => (
                <SavedJobCards key={index} {...job} />
            ))}
            <CustomPagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentpage}/>  
        </div>
    )
}

export default SavedJobs
