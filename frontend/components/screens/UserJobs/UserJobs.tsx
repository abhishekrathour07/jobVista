"use client"

import React, { useState } from 'react'
import Navbar from '@/components/custom/Navbar/Navbar'
import PreferJobs from './components/PreferJobs'
import FilterJobs from './components/Filter'
import JobCards from './components/JobCards'
import { jobs } from './data/jobdata'
import Footer from '@/components/custom/Footer/Footer'
import CustomPagination from '@/components/custom/Pagination/Pagination'

const UserJobs = () => {
    const [currentPage, setCurrentpage] = useState(1)
    const jobsPerPage = 4;
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;

    return (
        <div>
            <Navbar />

            <PreferJobs />

            <div className='flex gap-8 p-8'>
                <FilterJobs />
                <div className='grid grid-cols-2 gap-6'>
                    {jobs.slice(startIndex, endIndex).map(job => (
                        <JobCards key={job.id} title={job.title}
                            description={job.description}
                            location={job.location}
                            logo={job.logo}
                            status={job.status}
                            company={job.company}
                        />
                    ))}
                </div>
            </div>
            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentpage(page)}
            />
            <div className=' mt-6'>
            <Footer />
            </div>
        </div>
    )
}

export default UserJobs
