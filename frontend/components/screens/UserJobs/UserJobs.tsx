"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/custom/Navbar/Navbar'
import PreferJobs from './components/PreferJobs'
import FilterJobs from './components/Filter'
import JobCards from './components/JobCards'
import Footer from '@/components/custom/Footer/Footer'
import CustomPagination from '@/components/custom/Pagination/Pagination'
import jobServices from '@/services/Job.services'

const UserJobs = () => {

    const [data, setData] = useState<any>()
    const [currentPage, setCurrentpage] = useState(1)
    const jobsPerPage = 4;

    const handleGetAllJobs = async () => {
        try {
            const response = await jobServices.getAllJobs(currentPage, jobsPerPage);
            setData(response?.data || []);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleGetAllJobs()
    }, [currentPage])

    return (
        <div>
            <Navbar />
            <PreferJobs />
            <div className='flex gap-8 p-8'>
                <FilterJobs />
                <div className='grid grid-cols-2 gap-6'>
                    {data?.jobs?.map((job: any) => (
                        <JobCards key={job.id} title={job.jobtitle}
                            description={job.companyInfo}
                            location={job.location}
                            logo={job.companyLogo}
                            status={job.status}
                            company={job.companyname}
                        />
                    ))}
                </div>
            </div>
            <CustomPagination
                currentPage={currentPage}
                totalPages={data?.totalPages}
                onPageChange={(page) => setCurrentpage(page)}
            />
            <div className=' mt-6'>
                <Footer />
            </div>
        </div>
    )
}

export default UserJobs
