"use client"
import Navbar from '@/components/custom/Navbar/Navbar';

import React, { useState } from 'react'
import SearchJobs from './components/SearchJobs';
import CompanyLogos from './components/CompanyLogos';
import CreateProfile from './components/CreateProfile';
import Footer from '@/components/custom/Footer/Footer';
import JobDashboardStats from './components/JobStats';
import SavedJobCards from '../UserDashboard/components/SavedJobCards';
import { savedJobs } from '../UserDashboard/data/SavedData';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const UserHome = () => {
  const [lastIndex, setlastindex] = useState(2)
  return (
    <div >
      <Navbar />
      <SearchJobs />
      <JobDashboardStats />
      <div className='p-6'>
        <div className='flex flex-col border border-indigo-700 rounded-md bg-white space-y-5 p-6'>
          <div className='flex justify-between items-center px-2'>
            <h1 className='text-2xl font-bold'>Saved Jobs</h1>
            <Link href={"/user/dashboard?tabs=saved-jobs"} className='text-sm hover:underline font-bold flex items-center  text-indigo-800'>View all Saved job <ArrowRight className='h-4 w-4' /></Link>
          </div>
          {savedJobs.slice(0, lastIndex).map((job, index) => (
            <SavedJobCards key={index} {...job} />
          ))}
          <p className={`text-indigo-800 text-lg text-semibold hover:underline cursor-pointer ${lastIndex === 4 ? "hidden" : "block"}`} onClick={() => setlastindex(4)}>See more</p>
        </div>
      </div>
      <CompanyLogos />
      <CreateProfile />
      <Footer />
    </div>
  )
}

export default UserHome
