"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/custom/Navbar/Navbar'
import PreferJobs from './components/PreferJobs'
import FilterJobs from './components/Filter'
import JobCards from './components/JobCards'
import Footer from '@/components/custom/Footer/Footer'
import CustomPagination from '@/components/custom/Pagination/Pagination'
import jobServices from '@/services/Job.services'
import Loader from '@/components/custom/HashLoader/Loader'
import { JobTypes, PaginatedJobsResponseTypes } from '@/types/getPaginatedjobTypes'

const UserJobs = () => {

    const [data, setData] = useState<PaginatedJobsResponseTypes>()
    const [currentPage, setCurrentpage] = useState(1)
    const [loading, setloading] = useState(false)
    const jobsPerPage = 4;

    const handleGetAllJobs = async () => {
        setloading(true)
        try {
            const response = await jobServices.getAllJobs(currentPage, jobsPerPage);
            setData(response?.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        handleGetAllJobs()
    }, [currentPage])

    return (
        <div>
            <Navbar />
            {loading ? <div className='h-[70vh] flex items-center justify-center'>
                <Loader size={50} color="#0118D8" />
            </div> :
                <div>
                    <PreferJobs />
                    <div className='flex flex-col md:flex-row gap-6 p-8'>
                        <FilterJobs />
                        <div className='grid grid-cols-1 gap-6'>
                            {data?.jobs?.map((job: JobTypes, index: number) => (
                                <JobCards key={index}
                                    jobId={job._id}
                                    title={job.jobtitle}
                                    description={job.companyInfo}
                                    location={job.location}
                                    logo={job.companyLogo}
                                    status={job.status}
                                    company={job.companyname}
                                    isApplied={job.isApplied}
                                    deadline={job?.deadline}
                                />
                            ))}
                        </div>
                    </div>
                    <CustomPagination
                        currentPage={currentPage}
                        totalPages={data?.totalPages as number}
                        onPageChange={(page) => setCurrentpage(page)}
                    />
                </div>
            }

            <div className=' mt-6'>
                <Footer />
            </div>
        </div>
    )
}

export default UserJobs
