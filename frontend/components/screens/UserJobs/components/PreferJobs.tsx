import CustomButton from '@/components/custom/CustomButton/CustomButton'
import SearchBox from '@/components/custom/SearchBox/SearchBox'
import { MapPin, Search } from 'lucide-react'
import React from 'react'

const PreferJobs = () => {
  return (
    <div className='flex flex-col px-12 bg-indigo-50 justify-center gap-6 h-[30vh]'>
    <div className='flex flex-col text-start gap-2'>
        <h1 className='text-3xl font-bold'>Find Your <span className='text-indigo-600'>Perfect Job</span> Today</h1>
    </div>
   <div className='bg-white p-8 rounded-sm w-full shadow-xl'>
   <div className='flex gap-4 items-center'>
        <SearchBox placeholder='Search any Job' icon={<Search />} />
        <SearchBox placeholder='Search any location' icon={<MapPin />} />
        <CustomButton label='Search'/> 
    </div>
   </div>
</div>
  )
}

export default PreferJobs
