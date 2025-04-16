import Navbar from '@/components/custom/Navbar/Navbar';

import React from 'react'
import SearchJobs from './components/SearchJobs';
import CompanyLogos from './components/CompanyLogos';
import CreateProfile from './components/CreateProfile';
import Footer from '@/components/custom/Footer/Footer';

const UserHome = () => {
  return (
    <div className='text-center'>
      <Navbar />
      <SearchJobs />
      <CompanyLogos />


      <CreateProfile />
      <Footer />
    </div>
  )
}

export default UserHome
