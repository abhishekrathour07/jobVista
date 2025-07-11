"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/custom/Navbar/Navbar'
import PreferJobs from './components/PreferJobs'
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
    const [filters, setFilters] = useState({
        search: '',
        jobType: 'all',
        location: 'all',
        experience: 'all'
    })
    const jobsPerPage = 6;

    const handleGetAllJobs = async (resetPage = false) => {
        setloading(true)
        try {
            const page = resetPage ? 1 : currentPage;
            if (resetPage) {
                setCurrentpage(1);
            }
            
            const filterParams = {
                search: filters.search || undefined,
                jobType: filters.jobType !== 'all' ? filters.jobType : undefined,
                location: filters.location !== 'all' ? filters.location : undefined,
                experience: filters.experience !== 'all' ? filters.experience : undefined
            };

            const response = await jobServices.getAllJobs(page, jobsPerPage, filterParams);
            setData(response?.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false)
        }
    }

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setCurrentpage(1);
    }

    useEffect(() => {
        handleGetAllJobs()
    }, [currentPage])

    useEffect(() => {
        handleGetAllJobs(true)
    }, [filters])

    return (
        <div>
            <Navbar />
            {loading ? <div className='h-[70vh] flex items-center justify-center'>
                <Loader size={50} color="#0118D8" />
            </div> :
                <div>
                    <PreferJobs onFilterChange={handleFilterChange} />
                    <div className='flex flex-col md:flex-row gap-6 p-8'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                            {data?.jobs?.length === 0 ? (
                                <div className='col-span-full text-center py-12'>
                                    <h3 className='text-lg font-semibold text-gray-600'>No jobs found</h3>
                                    <p className='text-gray-500 mt-2'>Try adjusting your search filters</p>
                                </div>
                            ) : (
                                data?.jobs?.map((job: JobTypes, index: number) => (
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
                                ))
                            )}
                        </div>
                    </div>
                    {data?.jobs && data.jobs.length > 0 && (
                        <CustomPagination
                            currentPage={currentPage}
                            totalPages={data?.totalPages as number}
                            onPageChange={(page) => setCurrentpage(page)}
                        />
                    )}
                </div>
            }

            <div className=' mt-6'>
                <Footer />
            </div>
        </div>
    )
}

export default UserJobs
