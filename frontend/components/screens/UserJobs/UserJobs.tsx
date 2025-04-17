import React from 'react'
import Navbar from '@/components/custom/Navbar/Navbar'
import PreferJobs from './components/PreferJobs'
import FilterJobs from './components/Filter'
import JobCards from './components/JobCards'
import { jobs } from './data/jobdata'
import Footer from '@/components/custom/Footer/Footer'

const UserJobs = () => {
    return (
        <div>
            <Navbar />
            <PreferJobs />
            <div className='flex gap-8 p-8'>
                <FilterJobs />
                <div className='grid grid-cols-2 gap-6'>
                {jobs.map(job => (
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
            <Footer/>
        </div>
    )
}

export default UserJobs
