"use client"
import Navbar from '@/components/custom/Navbar/Navbar';

import React, { useEffect, useState } from 'react'
import SearchJobs from './components/SearchJobs';
import CompanyLogos from './components/CompanyLogos';
import CreateProfile from './components/CreateProfile';
import Footer from '@/components/custom/Footer/Footer';
import JobDashboardStats from './components/JobStats';
import SavedJobCards from '../UserDashboard/components/SavedJobCards';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import saveJobService from '@/services/savedJob.services';
import toast from 'react-hot-toast';
import applicantServices from '@/services/Applicants.services';
import { SavedData, savedJobResponseType, statesTypes } from '@/types/savedJobTypes';
import { ApiError } from '@/types/Error.type';

const UserHome = () => {
  const [lastIndex, setlastindex] = useState(2);
  const [jobData, setJobsData] = useState<savedJobResponseType>();
  const [statsData, setStatsData] = useState<statesTypes>();


  const getAllSavedJob = async () => {
    try {
      const response = await saveJobService.getallSavedJob();
      setJobsData(response?.data)
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  const getStatsData = async () => {
    try {
      const response = await applicantServices.userStats();
      setStatsData(response?.data)
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    getAllSavedJob();
    getStatsData();
  }, [])

  return (
    <div >
      <Navbar />
      <SearchJobs />
      <JobDashboardStats data={statsData as statesTypes} />
      {jobData?.totalsavedJobs !== 0 && (
        <div className='p-2 md:p-6'>
          <div className='flex flex-col border md:border-indigo-700 rounded-md bg-indigo-100 md:bg-white  space-y-5 p-6'>
            <div className='flex justify-between items-center px-2'>
              <h1 className='text-2xl font-bold'>Saved Jobs</h1>
              <Link href={"/user/dashboard?tabs=saved-jobs"} className='text-sm hover:underline font-bold flex items-center  text-indigo-800'>View all Saved job <ArrowRight className='h-4 w-4' /></Link>
            </div>
            {jobData?.savedData?.slice(0, lastIndex).map((job: SavedData, index: number) => (
              <SavedJobCards key={index} {...job} />
            ))}
            <p className={`text-indigo-800 text-lg text-semibold hover:underline cursor-pointer ${lastIndex === 4 ? "hidden" : "block"}`} onClick={() => setlastindex(4)}>See more</p>
          </div>
        </div>
      )}

      <CompanyLogos />
      <CreateProfile />
      <Footer />
    </div>
  )
}

export default UserHome
